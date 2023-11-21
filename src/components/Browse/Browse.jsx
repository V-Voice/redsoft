import React, { useState } from 'react';
import tree from '../../data'
import { Navigate } from 'react-router-dom';
import checkAuth from '../../AuthChecker';

const Browse = () => {
  const data = tree;


  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };
  
  const filteredChildren = selectedNode ? selectedNode.children.filter(child => child.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];
  
  if (!checkAuth()) {
    return <Navigate to="/login" />
  }
  return (
    <>
     <div className="container">
    <div className="column">
      <h4>Родительские элементы</h4>
      <ul id="parent-nodes">
      {data[0].children.map((node) => (
      <li key={node.key} onClick={() => handleNodeClick(node)}>{node.name}</li>
      ))}

      </ul>
    </div>
    <div className="column">
      <h4>Дочерние элементы {selectedNode ? selectedNode.name : 'selected parent'}</h4>
      <ul id="children">
      <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {filteredChildren.map((child) => (
      <li key={child.key}>{child.name}</li>
      ))}

      </ul>
    </div>
  </div>
    </>



  );
};

export default Browse;