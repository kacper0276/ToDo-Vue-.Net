export default class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandler: ((message: string) => void) | null = null;
  private errorHandler: ((error: Event) => void) | null = null;
  private closeHandler: ((event: CloseEvent) => void) | null = null;
  private openHandler: (() => void) | null = null;

  constructor(private url: string) {}

  connect() {
    if (this.socket) {
      console.warn("WebSocket is already connected.");
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      if (this.openHandler) {
        this.openHandler();
      }
    };

    this.socket.onmessage = (event) => {
      if (this.messageHandler) {
        this.messageHandler(event.data);
      }
    };

    this.socket.onerror = (error) => {
      if (this.errorHandler) {
        this.errorHandler(error);
      }
    };

    this.socket.onclose = (event) => {
      if (this.closeHandler) {
        this.closeHandler(event);
      }
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error(
        "WebSocket is not open. ReadyState:",
        this.socket?.readyState
      );
    }
  }

  setMessageHandler(handler: (message: string) => void) {
    this.messageHandler = handler;
  }

  setErrorHandler(handler: (error: Event) => void) {
    this.errorHandler = handler;
  }

  setCloseHandler(handler: (event: CloseEvent) => void) {
    this.closeHandler = handler;
  }

  setOpenHandler(handler: () => void) {
    this.openHandler = handler;
  }
}
