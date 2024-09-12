import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { FormControl, FormLabel, Box, Select } from '@chakra-ui/react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function ContentEditor({ content, setContent }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (content) {
      try {
        const contentBlock = htmlToDraft(content);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error('Error parsing HTML content:', error);
      }
    }
  }, [content]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    try {
      const htmlContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
      setContent(htmlContent);
    } catch (error) {
      console.error('Error converting editor state to HTML:', error);
    }
  };

  const handleHeadingChange = (e) => {
    try {
      const headingLevel = e.target.value;
      const newEditorState = setBlockType(editorState, headingLevel);
      onEditorStateChange(newEditorState);
    } catch (error) {
      console.error('Error changing heading:', error);
    }
  };

  const setBlockType = (editorState, blockType) => {
    const newContentState = Modifier.setBlockType(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      blockType
    );
    return EditorState.push(editorState, newContentState, 'change-block-type');
  };

  return (
    <FormControl isRequired>
      <FormLabel>Content</FormLabel>
      <Box 
        border="1px" 
        borderColor="gray.200" 
        borderRadius="md"
        sx={{
          '.rdw-editor-main': {
            minHeight: '300px',
            maxHeight: '500px',
            padding: '0 10px',
            overflowY: 'auto',
          },
          '.rdw-editor-toolbar': {
            borderBottom: '1px solid',
            borderColor: 'gray.200',
            marginBottom: '0',
          },
        }}
      >
        <Box display="flex" alignItems="center" p={2} borderBottom="1px solid" borderColor="gray.200">
          <Select onChange={handleHeadingChange} width="auto" mr={2}>
            <option value="">Normal</option>
            <option value="header-one">Heading 1</option>
            <option value="header-two">Heading 2</option>
            <option value="header-three">Heading 3</option>
            <option value="header-four">Heading 4</option>
            <option value="header-five">Heading 5</option>
            <option value="header-six">Heading 6</option>
          </Select>
        </Box>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: ['inline', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
            },
            list: {
              options: ['unordered', 'ordered', 'indent', 'outdent'],
            },
          }}
        />
      </Box>
    </FormControl>
  );
}

export default ContentEditor;