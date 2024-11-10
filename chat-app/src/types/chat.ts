export interface ChatMessage {
    text: string
    sender: string
    timestamp: string
    avatar: string
    isSelf?: boolean
}