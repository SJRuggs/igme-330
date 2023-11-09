export const downloadFile = async (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onerror = (e) => console.log("error downloading file");
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        console.log(`headers: ${headers}`);
        console.log(`jsonString: ${jsonString}`);
        callback(jsonString);
    };
    xhr.open("GET", url);
    xhr.send();
}