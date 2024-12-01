import "./styles.css";
import explorer from "./components/Data/Data.js";
import { useState } from "react";
import Folder from "./components/Folder/Folder.jsx";
import useTraverseTree from "./components/Hooks/customHook";

export default function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode } = useTraverseTree();

  const handelCreateFile = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  // console.log(explorerData);
  return (
    <div className="App">
      <Folder explorer={explorerData} handelCreateFile={handelCreateFile} />
    </div>
  );
}
