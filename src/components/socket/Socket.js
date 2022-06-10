import { io } from "socket.io-client";
const ENDPOINT = "http://10.128.50.114:5000";
export default io(ENDPOINT);
