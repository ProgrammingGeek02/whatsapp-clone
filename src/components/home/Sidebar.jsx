import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import { Contacts } from './Contacts';
import { Conversations } from './Conversations';
import { NewContactModal, NewConversationModal } from './Contacts/index'

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts'

export const Sidebar = ({ id }) => {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationsOpen = activeKey === CONVERSATIONS_KEY;

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div style={{ width: '250px' }} className="d-flex flex-column" >
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
                <Nav variant="tabs" className="justify-content-center" >
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY} >Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACTS_KEY} >Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-end overflow-auto flex-grow-1" >
                    <Tab.Pane eventKey={CONVERSATIONS_KEY} >
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACTS_KEY} >
                        <Contacts />
                    </Tab.Pane>
                    <div className="p-2 border-top border-top border-end small">
                        Your Id: <span className="text-muted">{ id }</span>
                    </div>
                    <Button onClick={() => setModalOpen(true)} >
                        New {conversationsOpen ? 'Conversation' : 'Contact'}
                    </Button>
                </Tab.Content>

                <Modal show={modalOpen} onHide={closeModal} >
                    {
                        conversationsOpen ?
                        (
                            <NewConversationModal closeModal={closeModal} />
                        ) : (
                            <NewContactModal closeModal={closeModal} />
                        )
                    }
                </Modal>
            </Tab.Container>
        </div>
    )
}