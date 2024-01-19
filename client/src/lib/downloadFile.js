export const downloadFile = (content, nameOfFile) => {
    if (typeof content !== 'string' || typeof nameOfFile !== 'string') {
        console.error('Content or name is not a string');
        return;
    }
    try {
        const blob = new Blob([content], { type: 'text/plain' }); 
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = nameOfFile + '.txt';
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (err) { 
        console.error(err);
    }
};
