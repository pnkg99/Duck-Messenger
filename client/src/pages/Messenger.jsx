import React from 'react'
import AssideControl from '../components/messenger/AssideControl'
import ChatBox from '../components/messenger/ChatBox'
import styles from "../css/messenger.module.css";

export default function Messenger() {
  return (
    <div className={styles.layOut}>
     <AssideControl/>
     <ChatBox />
    </div>
  )
}
