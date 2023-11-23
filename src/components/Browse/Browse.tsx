import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import checkAuth from '../../AuthChecker';
import st from './Browse.module.scss';

interface DataItem {
  key: string;
  name: string;
  children?: DataItem[];
}

const Browse: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<DataItem | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const handleNodeClick = (node: DataItem) => {
    setSelectedNode(node);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleNavigate = (node: DataItem) => {
    setSelectedNode(node);
  };

  const handleBack = () => {
    if (selectedNode && selectedNode.key !== '_') {
      const parentKey = selectedNode.key.substring(0, selectedNode.key.lastIndexOf('-'));
      const parentNode = findNodeByKey(parentKey, data[0]);
      setSelectedNode(parentNode);
    }
  };

  const findNodeByKey = (key: string, node: DataItem) => {
    if (node.key === key) {
      return node;
    } else if (node.children) {
      let result: DataItem | null = null;
      for (let i = 0; result === null && i < node.children.length; i++) {
        result = findNodeByKey(key, node.children[i]);
      }
      return
    }
    return null;
  };

  const sortedChildren = selectedNode?.children
    ? [...selectedNode.children].sort((a, b) =>
        sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    : [];

  const filteredChildren = selectedNode
    ? sortedChildren.filter(child =>
        child.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className={st.container}>
        <div className={st.parentList}>
          <h3>Родительские элементы</h3>
          <ul id="parent-nodes">
            {data[0].children.map(node => (
              <li key={node.key} onClick={() => handleNodeClick(node)}>
                {node.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={st.childList}>
          <h3>Дочерние элементы {selectedNode ? selectedNode.name : ''}</h3>
          {filteredChildren.length > 0 ? (
            <ul id="children">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSort}>
                ⇅
              </button>
              {filteredChildren.map(child => (
                <li key={child.key} onClick={() => handleNavigate(child)}>
                  {child.name}
                </li>
              ))}
              <button onClick={handleBack}>Назад</button>
            </ul>
          ) : (
            <h3 className={st.noItems}>Нет дочерних элементов ❌</h3>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Browse;