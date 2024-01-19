#include <inery/inery.hpp>
#include <inery/time.hpp>
#include <inery/system.hpp>
#include <inery/print.hpp>

#include <string.h>

using namespace inery;
using namespace std;

using inery::current_time_point;
using inery::indexed_by;
using inery::time_point_sec;

class [[inery::contract("msgcontract")]] msgcontract : public contract
{
public:
	using contract::contract;
	msgcontract(name reciever, name code, datastream<const char *> ds) : contract(reciever, code, ds),
																		 _profiles(get_self(), get_self().value) {}

	struct message
	{
		string msg;
		time_point time;
	};

	TABLE inbox
	{
		name from;
		vector<message> messages;
		uint64_t primary_key() const { return from.value; }
	};
	typedef inery::multi_index<"inbox"_n, inbox> inbox_t;

	TABLE requests
	{
		name contact;
		string key;
		uint64_t primary_key() const { return contact.value; }
	};
	typedef inery::multi_index<"requests"_n, requests> requests_t;

	TABLE profiles
	{
		name owner;
		string rsa_pub;
		vector<name> requests;
		vector<name> contacts;

		uint64_t primary_key() const { return owner.value; }
	};
	typedef inery::multi_index<"profiles"_n, profiles> profiles_t;

	ACTION reguser(name owner, string rsa_pub)
	{
		require_auth(owner);
		auto itr = _profiles.find(owner.value);
		check(itr == _profiles.end(), "User with that name already exists!");
		_profiles.emplace(get_self(), [&](auto &row)
						  { row.owner = owner; 
                          row.rsa_pub = rsa_pub; });
	};

	ACTION deleteallp()
	{
		require_auth(get_self());
		auto itr = _profiles.begin();
		while (itr != _profiles.end())
		{
			itr = _profiles.erase(itr);
		}
		print("All profiles deleted.");
	};
	ACTION setrsakey(name owner, string rsa_pub)
	{
		require_auth(owner);
		auto itr = _profiles.find(owner.value);
		check(itr != _profiles.end(), "User with that name dont exists!");
		_profiles.modify(itr, owner, [&](auto &row)
						 { row.rsa_pub = rsa_pub; });
	}

	ACTION login(name owner)
	{
		require_auth(owner);
		auto itr = _profiles.find(owner.value);
		check(itr != _profiles.end(), "User with that name dont exists!");
	};

	ACTION sendreqest(name from, name to, string key)
	{
		require_auth(from);
		auto to_itr = _profiles.find(to.value);
		check(to_itr != _profiles.end(), "Requested account is not registered");

		auto from_itr = _profiles.find(from.value);
		check(from_itr != _profiles.end(), "Owner account is not registered");

		_profiles.modify(from_itr, from, [&](auto &row)
						 { 
            auto sender_req_itr = std::find(row.requests.begin(), row.requests.end(), to);
            check(sender_req_itr == row.requests.end(), "You have pending request from that contact"); });

		_profiles.modify(to_itr, from, [&](auto &row)
						 {
                auto req_it = std::find(row.requests.begin(), row.requests.end(), from);
		        check(req_it == row.requests.end(), "Request is already sent");
                auto cont_it = std::find(row.contacts.begin(), row.contacts.end(), from);
		        check(cont_it == row.contacts.end(), "Already has contact");
                    row.requests.push_back(from); });
		requests_t _requests(from, to.value);
		auto req_it = _requests.find(from.value);
		if (req_it == _requests.end())
		{
			_requests.emplace(from, [&](auto &row)
							  {
            row.contact = from;
            row.key = key; });
		}
		else
		{
			_requests.modify(req_it, from, [&](auto &row)
							 { row.key = key; });
		}
	};
	ACTION resprequest(name owner, name from, bool accept)
	{
		require_auth(owner);
		auto owner_itr = _profiles.find(owner.value);
		check(owner_itr != _profiles.end(), "Owner account is not reqistered");
		auto from_itr = _profiles.find(from.value);
		check(from_itr != _profiles.end(), "From account is not reqistered");
		_profiles.modify(owner_itr, owner, [&](auto &row)
						 {
                auto acc_it = std::find(row.requests.begin(), row.requests.end(), from);
		        check(acc_it != row.requests.end(), "Request doesnt exist");
                    if (accept) {
                        row.contacts.push_back(from);
                    }
                     
                    row.requests.erase(std::remove(row.requests.begin(), row.requests.end(), from), row.requests.end()); });
		if (accept)
		{
			_profiles.modify(from_itr, owner, [&](auto &row)
							 { row.contacts.push_back(owner); });
		}
	};
	ACTION rmcontact(name owner, name contact)
	{
		require_auth(owner);
		auto itr = _profiles.find(owner.value);
		check(itr != _profiles.end(), "Owner account is not registered");

		_profiles.modify(itr, owner, [&](auto &row)
						 { 
            auto contact_itr = std::find(row.contacts.begin(), row.contacts.end(), contact);
            check(contact_itr != row.contacts.end(), "You don't have that contact");
            row.contacts.erase(std::remove(row.contacts.begin(), row.contacts.end(), contact), row.contacts.end()); });

		auto c_itr = _profiles.find(contact.value);
		check(c_itr != _profiles.end(), "Contact doesn't exist");
		_profiles.modify(c_itr, owner, [&](auto &row)
						 { row.contacts.erase(std::remove(row.contacts.begin(), row.contacts.end(), owner), row.contacts.end()); });
	};

	ACTION sendmsg(name from, name to, string data)
	{
		require_auth(from);
		inbox_t _inbox(_self, to.value);
		auto ct = current_time_point();
		message msg = {data, ct};
		auto itr = _inbox.find(from.value);
		if (itr != _inbox.end())
		{
			_inbox.modify(itr, from, [&](auto &row)
						  { row.messages.push_back(msg); });
		}
		else
		{
			_inbox.emplace(from, [&](auto &row)
						   {
				row.from = from;
				 row.messages.push_back(msg); });
		}
	};

private:
	profiles_t _profiles;
};