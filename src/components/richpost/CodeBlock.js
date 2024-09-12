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