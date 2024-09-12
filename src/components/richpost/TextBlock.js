import React, { useState, useCallback } from 'react';
import { Box, Button, HStack, Input, VStack, IconButton } from '@chakra-ui/react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { FaBold, FaItalic, FaStrikethrough, FaLink, FaTrash } from 'react-icons/fa';

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'P', style: 'paragraph' },
  { label: 'Quote', style: 'blockquote' },
];

const TextBlock = ({ block, updateBlockContent, deleteBlock }) => {
  const [editorState, setEditorState] = useState(() => {
    const contentState = block.content 
      ? convertFromRaw(JSON.parse(block.content))
      : EditorState.createEmpty().getCurrentContent();
    return EditorState.createWithContent(contentState);
  });
  const [showToolbar, setShowToolbar] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  const handleChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
    setShowToolbar(!newEditorState.getSelection().isCollapsed());
    
    const content = JSON.stringify(convertToRaw(newEditorState.getCurrentContent()));
    updateBlockContent(block.id, content);
  }, [block.id, updateBlockContent]);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    handleChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const addLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: linkUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    
    handleChange(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ));
    setLinkUrl('');
  };

  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      handleChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  const ToolbarButton = ({ label, style, icon: Icon, onClick }) => (
    <Button
      size="xs"
      onClick={onClick || (() => label ? toggleBlockType(style) : toggleInlineStyle(style))}
      colorScheme={editorState.getCurrentInlineStyle().has(style) ? "blue" : "gray"}
    >
      {Icon ? <Icon /> : label}
    </Button>
  );

  return (
    <Box position="relative" mb={4}>
      {showToolbar && (
        <VStack spacing={2} mb={2} align="start">
          <HStack spacing={1}>
            <ToolbarButton style="BOLD" icon={FaBold} />
            <ToolbarButton style="ITALIC" icon={FaItalic} />
            <ToolbarButton style="STRIKETHROUGH" icon={FaStrikethrough} />
            {BLOCK_TYPES.map((type) => (
              <ToolbarButton key={type.label} label={type.label} style={type.style} />
            ))}
          </HStack>
          <HStack>
            <Input 
              placeholder="Enter link URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              size="sm"
            />
            <Button size="sm" onClick={addLink} leftIcon={<FaLink />}>
              Add Link
            </Button>
            <Button size="sm" onClick={removeLink}>
              Remove Link
            </Button>
          </HStack>
        </VStack>
      )}
      <Editor
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
      />
      <IconButton
        icon={<FaTrash />}
        aria-label="Delete block"
        size="sm"
        colorScheme="red"
        position="absolute"
        top="0"
        right="-50px"
        onClick={() => deleteBlock(block.id)}
      />
    </Box>
  );
};

export default TextBlock;