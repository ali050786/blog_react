import React, { useState, useEffect } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import TextBlock from './TextBlock';

const RichTextEditor = ({ initialContent, onChange }) => {
  const [blocks, setBlocks] = useState(initialContent ? JSON.parse(initialContent) : [{ id: nanoid(), content: '' }]);

  const updateBlockContent = (id, newContent) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  const addBlock = () => {
    setBlocks(prevBlocks => [...prevBlocks, { id: nanoid(), content: '' }]);
  };

  const deleteBlock = (id) => {
    setBlocks(prevBlocks => {
      if (prevBlocks.length > 1) {
        return prevBlocks.filter(block => block.id !== id);
      }
      return prevBlocks;
    });
  };

  useEffect(() => {
    onChange(JSON.stringify(blocks));
  }, [blocks, onChange]);

  return (
    <Box borderWidth={1} borderRadius="md" p={4} position="relative">
      <VStack spacing={4} align="stretch">
        {blocks.map(block => (
          <TextBlock
            key={block.id}
            block={block}
            updateBlockContent={updateBlockContent}
            deleteBlock={deleteBlock}
          />
        ))}
        <Button size="sm" onClick={addBlock}>Add Text Block</Button>
      </VStack>
    </Box>
  );
};

export default RichTextEditor;