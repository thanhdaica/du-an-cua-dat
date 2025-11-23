import routerTip from "./tip.js";
import routerStreamer from "./streamer.js";
export default function router (app){
    app.use('/api/tip', routerTip);
    app.use('/api/streamer', routerStreamer);
}