import React, { useState } from 'react';
import tree from '../../data';
import { Navigate } from 'react-router-dom';
import checkAuth from '../../AuthChecker';
import st from './Browse.module.css'

const Browse = () => {
  const data = tree;

  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleNodeClick = node => {
    setSelectedNode(node);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleNavigate = node => {
    setSelectedNode(node);
  };

  const handleBack = () => {
    if (selectedNode && selectedNode.key !== '_') {
      const parentKey = selectedNode.key.substring(
        0,
        selectedNode.key.lastIndexOf('-')
      );
      const parentNode = findNodeByKey(parentKey, data[0]);
      setSelectedNode(parentNode);
    }
  };

  const findNodeByKey = (key, node) => {
    if (node.key === key) {
      return node;
    } else if (node.children) {
      let result = null;
      for (let i = 0; result === null && i < node.children.length; i++) {
        result = findNodeByKey(key, node.children[i]);
      }
      return result;
    }
    return null;
  };

  const sortedChildren =
    selectedNode && Array.isArray(selectedNode.children)
      ? selectedNode.children.slice().sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        })
      : [];

  const filteredChildren = selectedNode
    ? sortedChildren.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!checkAuth()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
    <div >
      <div className={st.container}>
        <div className={st.column}>
          <h4>Родительские элементы</h4>
          <ul id="parent-nodes">
            {data[0].children.map(node => (
              <li key={node.key} onClick={() => handleNodeClick(node)}>
                {node.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={st.column}>
          <h4>
            Дочерние элементы {selectedNode ? selectedNode.name : ''}
          </h4>
          {filteredChildren.length > 0 ? (
            <ul id="children">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSort}>
                {sortOrder === 'asc'
                  ? 'Сортировать по возрастанию'
                  : 'Сортировать по убыванию'}
              </button>
              {filteredChildren.map(child => (
                <li key={child.key} onClick={() => handleNavigate(child)}>
                  {child.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет дочерних элементов</p>
          )}
          <div>
            <button onClick={handleBack}>Назад</button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Browse;
