import { useState } from "react";

function Folder({ handelCreateFile = () => {}, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const addFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handelCreateFile(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };
  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁{explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>File+</button>
            <button onClick={(e) => handleNewFolder(e, false)}>Folder+</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={addFolder}
                onBlur={() => {
                  setShowInput({
                    ...showInput,
                    visible: false,
                  });
                }}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return <Folder explorer={exp} key={exp.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">{explorer.name}</span>;
  }
}
export default Folder;
