package message_handler


// Hub maintains the set of active clients and broadcasts messages to the clients.
type Hub struct {
	// Registered clients.
	clients map[*Client]bool

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

// NewHub will will give an instance of an Hub
func NewHub() *Hub {
	hub := Hub{
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
	go hub.Run()
	return &hub
}

// Run will execute Go Routines to check incoming Socket events
func (hub *Hub) Run() {
	for {
		select {
		case client := <-hub.register:
			HandleUserRegisterEvent(hub, client)

		case client := <-hub.unregister:
			HandleUserDisconnectEvent(hub, client)
		}
	}
}