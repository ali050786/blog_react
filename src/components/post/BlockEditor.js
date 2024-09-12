import React, { useState, useCallback } from 'react';
import { Box, Button, HStack, Input, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel } from '@chakra-ui/react';
import { FaImage, FaCode, FaVideo, FaMinus, FaPlus } from 'react-icons/fa';
import ContentEditor from './ContentEditor';

const BlockTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  CODE: 'code',
  VIDEO: 'video',
  SEPARATOR: 'separator'
};

const Block = ({ block, updateBlock, deleteBlock, addBlock, index }) => {
  const handleContentChange = (newContent) => {
    updateBlock(block.id, { ...block, content: newContent });
  };

  const BlockContent = () => {
    switch (block.type) {
      case BlockTypes.TEXT:
        return (
          <Box position="relative" zIndex="1">
            <ContentEditor content={block.content} setContent={handleContentChange} />
          </Box>
        );
      case BlockTypes.IMAGE:
        return (
          <Box>
            <img src={block.content} alt="Uploaded content" style={{ maxWidth: '100%' }} />
          </Box>
        );
      case BlockTypes.CODE:
        return (
          <pre style={{ fontFamily: 'monospace', backgroundColor: '#f0f0f0', padding: '0.5em' }}>
            {block.content}
          </pre>
        );
      case BlockTypes.VIDEO:
        return (
          <Box>
            <iframe
              width="560"
              height="315"
              src={block.content}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        );
      case BlockTypes.SEPARATOR:
        return <hr />;
      default:
        return null;
    }
  };

  return (
    <Box position="relative" mb={4}>
      <BlockContent />
      <HStack
        position="absolute"
        top="-1.5em"
        right="0"
        opacity="0"
        visibility="hidden"
        transition="opacity 0.2s, visibility 0.2s"
        bg="white"
        p={1}
        borderRadius="md"
        boxShadow="md"
        zIndex="2"
        _groupHover={{
          opacity: 1,
          visibility: "visible"
        }}
      >
        <Button size="xs" onClick={() => addBlock(BlockTypes.TEXT, index)}><FaPlus /></Button>
        <Button size="xs" onClick={() => addBlock(BlockTypes.IMAGE, index)}><FaImage /></Button>
        <Button size="xs" onClick={() => addBlock(BlockTypes.CODE, index)}><FaCode /></Button>
        <Button size="xs" onClick={() => addBlock(BlockTypes.VIDEO, index)}><FaVideo /></Button>
        <Button size="xs" onClick={() => addBlock(BlockTypes.SEPARATOR, index)}><FaMinus /></Button>
        <Button size="xs" onClick={() => deleteBlock(block.id)}>Delete</Button>
      </HStack>
    </Box>
  );
};

const BlockEditor = ({ content, setContent }) => {
  const [blocks, setBlocks] = useState(content && content.length > 0 ? content : [{ id: '1', type: BlockTypes.TEXT, content: '' }]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const [tempBlockIndex, setTempBlockIndex] = useState(null);

  const addBlock = (type, index) => {
    if (type === BlockTypes.TEXT) {
      const newBlock = { id: Date.now().toString(), type: BlockTypes.TEXT, content: '' };
      const newBlocks = [...blocks.slice(0, index + 1), newBlock, ...blocks.slice(index + 1)];
      setBlocks(newBlocks);
      setContent(newBlocks);
    } else {
      setTempBlockIndex(index);
      setModalType(type);
      onOpen();
    }
  };

  const handleModalSubmit = (content) => {
    const newBlock = { id: Date.now().toString(), type: modalType, content };
    const newBlocks = [...blocks.slice(0, tempBlockIndex + 1), newBlock, ...blocks.slice(tempBlockIndex + 1)];
    setBlocks(newBlocks);
    setContent(newBlocks);
    onClose();
  };

  const updateBlock = useCallback((id, updatedBlock) => {
    const newBlocks = blocks.map(block => block.id === id ? updatedBlock : block);
    setBlocks(newBlocks);
    setContent(newBlocks);
  }, [blocks, setContent]);

  const deleteBlock = (id) => {
    if (blocks.length > 1) {
      const newBlocks = blocks.filter(block => block.id !== id);
      setBlocks(newBlocks);
      setContent(newBlocks);
    }
  };

  return (
    <FormControl isRequired>
      <FormLabel>Content</FormLabel>
      <VStack align="stretch" spacing={4}>
        {blocks.map((block, index) => (
          <Box key={block.id} role="group">
            <Block
              block={block}
              updateBlock={updateBlock}
              deleteBlock={deleteBlock}
              addBlock={addBlock}
              index={index}
            />
          </Box>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {modalType} Block</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalType === BlockTypes.IMAGE && (
              <Input type="file" onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => handleModalSubmit(reader.result);
                reader.readAsDataURL(file);
              }} />
            )}
            {modalType === BlockTypes.VIDEO && (
              <Input placeholder="Enter video URL" onBlur={(e) => handleModalSubmit(e.target.value)} />
            )}
            {modalType === BlockTypes.CODE && (
              <Input placeholder="Enter code" onBlur={(e) => handleModalSubmit(e.target.value)} />
            )}
            {modalType === BlockTypes.SEPARATOR && (
              <Button onClick={() => handleModalSubmit('')}>Add Separator</Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormControl>
  );
};

export default BlockEditor;