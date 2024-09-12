

// File: src\App.js
// src/App.js
/*import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import theme from './styles/theme';
import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          
          <AppRoutes />
          
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;*/

///
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Header />
          <AppRoutes />
          <Footer />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

// File: src\App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// File: src\components\Footer.js
// src/components/Footer.js
import React from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" py={4} bg="gray.100" mt={8}>
      <Container maxW="container.xl">
        <Text textAlign="center" fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} Simple Blog. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}

export default Footer;

// File: src\components\Header.js
import React from 'react';
import { Box, Flex, Heading, Button, Text, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';

function Header() {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Heading size="md">
          <RouterLink to="/">Simple Blog</RouterLink>
        </Heading>
        <Flex alignItems={'center'}>
          {user ? (
            <>
              <Text mr={4}>Welcome, {user.username}!</Text>
              <Button as={RouterLink} to="/create" colorScheme="teal" mr={4}>
                Create Post
              </Button>
              <Button onClick={logout} colorScheme="red">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={onOpen} colorScheme="blue">Login</Button>
          )}
        </Flex>
      </Flex>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Header;

// File: src\components\LoginModal.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react';

function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Login
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;

// File: src\components\post\BlockEditor.js
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

// File: src\components\post\CategoryInput.js
// File: src/components/post/CategoryInput.js
import React from 'react';
import { FormControl, FormLabel, Input, Button, Box, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

function CategoryInput({ categories, setCategories, newCategory, setNewCategory }) {
  const handleAddCategory = () => {
    if (newCategory && !categories.find(cat => cat.name === newCategory)) {
      setCategories([...categories, { name: newCategory }]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat.name !== categoryToRemove));
  };

  return (
    <FormControl>
      <FormLabel>Categories</FormLabel>
      <HStack>
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add a category"
        />
        <Button onClick={handleAddCategory}>Add</Button>
      </HStack>
      <Box mt={2}>
        {categories.map((category, index) => (
          <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="green" mr={2} mb={2}>
            <TagLabel>{category.name}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveCategory(category.name)} />
          </Tag>
        ))}
      </Box>
    </FormControl>
  );
}

export default CategoryInput;

// File: src\components\post\ContentEditor.js
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

// File: src\components\post\CoverImageUpload.js
// File: src/components/post/CoverImageUpload.js
import React from 'react';
import { FormControl, FormLabel, Input, Image } from '@chakra-ui/react';

function CoverImageUpload({ handleImageChange, previewImage }) {
  return (
    <FormControl>
      <FormLabel>Cover Image</FormLabel>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {previewImage && (
        <Image src={previewImage} alt="Cover preview" maxHeight="200px" mt={2} />
      )}
    </FormControl>
  );
}

export default CoverImageUpload;

// File: src\components\post\PostActions.js
// File: src/components/post/PostActions.js
import React from 'react';
import { Flex, Button, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function PostActions({ postId, isLoggedIn }) {
  return (
    <Flex>
      <Button as={RouterLink} to="/" colorScheme="teal">
        Back to Posts
      </Button>
      <Spacer />
      {isLoggedIn && (
        <Button as={RouterLink} to={`/edit/${postId}`} colorScheme="blue">
          Edit Post
        </Button>
      )}
    </Flex>
  );
}

export default PostActions;

// File: src\components\post\PostContent.js
import React from 'react';
import { Box } from '@chakra-ui/react';

function PostContent({ content }) {
  return (
    <Box 
      className="ql-editor" 
      dangerouslySetInnerHTML={{ __html: content }} 
      sx={{
        '& img': {
          maxWidth: '100%',
          height: 'auto',
        },
      }}
    />
  );
}

export default PostContent;

// File: src\components\post\PostHeader.js
// File: src/components/post/PostHeader.js
import React from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';

function PostHeader({ title, coverImage }) {
  return (
    <Box>
      {coverImage && (
        <Image 
          src={`http://localhost:5000/uploads/${coverImage}`} 
          alt={title} 
          maxHeight="400px" 
          objectFit="cover" 
          width="100%"
          mb={4}
        />
      )}
      <Heading>{title}</Heading>
    </Box>
  );
}

export default PostHeader;


// File: src\components\post\PostMetadata.js
// File: src/components/post/PostMetadata.js
import React from 'react';
import { Box, HStack, Tag, Text } from '@chakra-ui/react';

function PostMetadata({ categories, tags, createdAt }) {
  return (
    <Box>
      <HStack spacing={2} mb={2}>
        {categories.map((category, index) => (
          <Tag key={index} size="md" colorScheme="green">
            {category.name}
          </Tag>
        ))}
      </HStack>
      <HStack spacing={2} mb={2}>
        {tags.map((tag, index) => (
          <Tag key={index} size="md" colorScheme="blue">
            {tag.name}
          </Tag>
        ))}
      </HStack>
      <Text fontSize="sm" color="gray.500">
        Posted on: {new Date(createdAt).toLocaleDateString()}
      </Text>
    </Box>
  );
}

export default PostMetadata;

// File: src\components\post\TagInput.js
// File: src/components/post/TagInput.js
import React from 'react';
import { FormControl, FormLabel, Input, Button, Box, HStack, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

function TagInput({ tags, setTags, newTag, setNewTag }) {
  const handleAddTag = () => {
    if (newTag && !tags.find(tag => tag.name === newTag)) {
      setTags([...tags, { name: newTag }]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag.name !== tagToRemove));
  };

  return (
    <FormControl>
      <FormLabel>Tags</FormLabel>
      <HStack>
        <Input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
        />
        <Button onClick={handleAddTag}>Add</Button>
      </HStack>
      <Box mt={2}>
        {tags.map((tag, index) => (
          <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="blue" mr={2} mb={2}>
            <TagLabel>{tag.name}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveTag(tag.name)} />
          </Tag>
        ))}
      </Box>
    </FormControl>
  );
}

export default TagInput;

// File: src\components\post\TitleInput.js
// File: src/components/post/TitleInput.js
import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

function TitleInput({ title, setTitle }) {
  return (
    <FormControl isRequired>
      <FormLabel>Title</FormLabel>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
      />
    </FormControl>
  );
}

export default TitleInput;

// File: src\components\PostForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import useApi from '../hooks/useApi';
import RichTextEditor from './richpost/RichTextEditor';
import CoverImageUpload from './post/CoverImageUpload';
import CategoryInput from './post/CategoryInput';
import TagInput from './post/TagInput';

function PostForm({ initialValues, isEditing }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  const navigate = useNavigate();
  const toast = useToast();
  const { request, loading } = useApi();

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title || '');
      setContent(initialValues.content || '');
      setCategories(initialValues.categories || []);
      setTags(initialValues.tags || []);
      if (initialValues.cover_image) {
        setPreviewImage(`http://localhost:5000/uploads/${initialValues.cover_image}`);
      }
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    categories.forEach(cat => formData.append('categories', cat.name));
    tags.forEach(tag => formData.append('tags', tag.name));
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      if (isEditing) {
        await request({
          method: 'put',
          url: `http://localhost:5000/api/posts/${initialValues.id}`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Post updated",
          description: "Your post has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await request({
          method: 'post',
          url: 'http://localhost:5000/api/posts',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast({
          title: "Post created",
          description: "Your new post has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your post. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </FormControl>

        <CoverImageUpload
          handleImageChange={handleImageChange}
          previewImage={previewImage}
        />

        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <RichTextEditor
            initialContent={content}
            onChange={setContent}
          />
        </FormControl>

        <CategoryInput
          categories={categories}
          setCategories={setCategories}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
        />

        <TagInput
          tags={tags}
          setTags={setTags}
          newTag={newTag}
          setNewTag={setNewTag}
        />

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          {isEditing ? 'Update Post' : 'Create Post'}
        </Button>
      </VStack>
    </form>
  );
}

export default PostForm;

// File: src\components\PostList.js
import React, { useState, useEffect } from 'react';
import { VStack, Box, Heading, Button, Flex, Link, Text, Tag, HStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useApi from '../hooks/useApi';

function PostList() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const { request } = useApi();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await request({ method: 'get', url: 'http://localhost:5000/api/posts' });
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await request({ method: 'delete', url: `http://localhost:5000/api/posts/${id}` });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <VStack spacing={4} align="stretch">
      {posts.map((post) => (
        <Box key={post.id} p={5} shadow="md" borderWidth="1px">
          {post.cover_image && (
            <Image src={`http://localhost:5000/uploads/${post.cover_image}`} alt={post.title} mb={4} maxHeight="200px" objectFit="cover" />
          )}
          <Heading fontSize="xl">
            <Link as={RouterLink} to={`/post/${post.id}`} color="teal.500">
              {post.title}
            </Link>
          </Heading>
          <Text mt={4} noOfLines={3}>
            {stripHtml(post.content)}
          </Text>
          <HStack mt={2} spacing={2}>
            {post.categories.map((category, index) => (
              <Tag key={index} size="sm" colorScheme="green">
                {category.name}
              </Tag>
            ))}
          </HStack>
          <HStack mt={2} spacing={2}>
            {post.tags.map((tag, index) => (
              <Tag key={index} size="sm" colorScheme="blue">
                {tag.name}
              </Tag>
            ))}
          </HStack>
          <Flex mt={4}>
            <Button as={RouterLink} to={`/post/${post.id}`} size="sm" colorScheme="teal">
              Read More
            </Button>
            {user && (
              <>
                <Button as={RouterLink} to={`/edit/${post.id}`} size="sm" ml={2}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </>
            )}
          </Flex>
        </Box>
      ))}
    </VStack>
  );
}

export default PostList;

// File: src\components\richpost\CodeBlock.js
import React, { useState } from 'react';
import { Box, Textarea, Select } from '@chakra-ui/react';

const CodeBlock = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  return (
    <Box>
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        mb={2}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        {/* Add more language options as needed */}
      </Select>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here"
        fontFamily="monospace"
        rows={5}
        mb={2}
      />
      <Box
        as="pre"
        className={`language-${language}`}
        p={2}
        borderWidth={1}
        borderRadius="md"
        overflowX="auto"
      >
        <code>{code}</code>
      </Box>
    </Box>
  );
};

export default CodeBlock;

// File: src\components\richpost\ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <button type="button">Upload Image</button>
      </label>
      {image && <img src={image} alt="Uploaded" className="mt-4 max-w-full h-auto" />}
    </div>
  );
};

export default ImageUpload;

// File: src\components\richpost\RichTextEditor.js
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

// File: src\components\richpost\TextBlock.js
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

// File: src\components\richpost\VideoEmbed.js
import React, { useState } from 'react';

const VideoEmbed = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the URL to extract the video ID
    // and generate the appropriate embed code
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter video URL"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2">Embed Video</button>
    </form>
  );
};

export default VideoEmbed;

// File: src\contexts\AuthContext.js
import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {}, {
        auth: {
          username,
          password
        }
      });
      if (response.status === 200) {
        const userData = { username, password };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// File: src\hooks\useApi.js
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useAuth } from './useAuth';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const toast = useToast();
  const { user } = useAuth();

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      if (user && user.username && user.password) {
        config.auth = {
          username: user.username,
          password: user.password
        };
      }
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('API request failed:', error.response || error);
      let errorMessage = 'An unexpected error occurred';
      if (error.response) {
        errorMessage = error.response.data.message || error.response.data.error || error.message;
      } else if (error.request) {
        errorMessage = 'No response received from the server';
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  return { loading, error, request };
};

export default useApi;

// File: src\hooks\useAuth.js
// src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// File: src\index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// File: src\pages\CreatePost.js
// src/pages/CreatePost.js
import React from 'react';
import { Container, VStack, Heading } from '@chakra-ui/react';
import PostForm from '../components/PostForm';

function CreatePost() {
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Heading>Create a New Post</Heading>
        <PostForm />
      </VStack>
    </Container>
  );
}

export default CreatePost;

// File: src\pages\EditPost.js
// src/pages/EditPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, VStack, Heading } from '@chakra-ui/react';
import PostForm from '../components/PostForm';
import { getPost } from '../services/api';

function EditPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error (e.g., show error message or redirect)
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return <Container maxW="container.xl" py={5}>Loading...</Container>;
  }

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Heading>Edit Post</Heading>
        <PostForm initialValues={post} isEditing={true} />
      </VStack>
    </Container>
  );
}

export default EditPost;

// File: src\pages\FullPost.js
// File: src/pages/FullPost.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, VStack } from '@chakra-ui/react';
import useApi from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import PostHeader from '../components/post/PostHeader';
import PostMetadata from '../components/post/PostMetadata';
import PostContent from '../components/post/PostContent';
import PostActions from '../components/post/PostActions';

function FullPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const { request } = useApi();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await request({ method: 'get', url: `http://localhost:5000/api/posts/${id}` });
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id, request]);

  if (!post) {
    return <Container maxW="container.xl" py={5}>Loading...</Container>;
  }

  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8} align="stretch">
        <PostHeader title={post.title} coverImage={post.cover_image} />
        <PostMetadata 
          categories={post.categories} 
          tags={post.tags} 
          createdAt={post.created_at} 
        />
        <PostContent content={post.content} />
        <PostActions postId={post.id} isLoggedIn={!!user} />
      </VStack>
    </Container>
  );
}

export default FullPost;

// File: src\pages\Home.js
// src/pages/Home.js
import React from 'react';
import { Container, VStack, Heading } from '@chakra-ui/react';
import PostList from '../components/PostList';

function Home() {
  return (
    <Container maxW="container.xl" py={5}>
      <VStack spacing={8}>
        <Heading>Welcome to Our Blog</Heading>
        <PostList />
      </VStack>
    </Container>
  );
}

export default Home;

// File: src\reportWebVitals.js
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;


// File: src\routes\AppRoutes.js
// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import FullPost from '../pages/FullPost';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<FullPost />} />
    </Routes>
  );
}

export default AppRoutes;



// File: src\services\api.js
// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getPost = async (id) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const createPost = async (postData, auth) => {
  const response = await axios.post(`${API_URL}/posts`, postData, { auth });
  return response.data;
};

export const updatePost = async (id, postData, auth) => {
  const response = await axios.put(`${API_URL}/posts/${id}`, postData, { auth });
  return response.data;
};

export const deletePost = async (id, auth) => {
  await axios.delete(`${API_URL}/posts/${id}`, { auth });
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {}, { auth: { username, password } });
  return response.data;
};

// File: src\setupTests.js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


// File: src\styles\theme.js
// src/styles/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e0f2ff',
      100: '#b1d8ff',
      200: '#81beff',
      300: '#51a3ff',
      400: '#2289ff',
      500: '#0070f3',
      600: '#0057c0',
      700: '#003e8e',
      800: '#00255c',
      900: '#000c2b',
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Open Sans", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
          },
        }),
      },
    },
  },
});

export default theme;