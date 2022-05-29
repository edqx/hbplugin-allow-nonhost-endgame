import {
    HindenburgPlugin,
    WorkerPlugin,
    MessageHandler,
    EndGameMessage,
    PacketContext,
    MessageDirection
} from "@skeldjs/hindenburg";

@HindenburgPlugin("hbplugin-allow-nonhost-endgame", "1.0.0", "none")
export class AllowEndgamePlugin extends WorkerPlugin {
    @MessageHandler(EndGameMessage, { override: true })
    onEndGameMessage(message: EndGameMessage, { sender }: PacketContext) {
        const player = sender.getPlayer();
        if (!player)
            return;

        sender.room?.decoder.emitDecoded(message, MessageDirection.Serverbound, player);
    }
}