import React, { FC, useState } from "react";

type types = {
  voidFunc: (e: any) => void;
  voidNoParams: () => void;
};

const Drag: FC<{}> = () => {
  const [selectedFile, setselectedFile] = useState<null | File>(null);
  const [active, setactive] = useState<boolean>(false);

  const _dropEnded: types["voidFunc"] = e => {
    e.preventDefault();
    setactive(false);
    setselectedFile(e.dataTransfer.files[0]);
  };

  const _selectFile: types["voidFunc"] = e => {
    setselectedFile(e.target.files[0]);
  };
  const _dragOver: types["voidNoParams"] = () => {
    setactive(true);
  };
  const _dragLeave: types["voidNoParams"] = () => {
    setactive(false);
  };
  React.useEffect(() => {
    window.addEventListener(
      "dragover",
      function(e) {
        e.preventDefault();
      },
      false
    );
    window.addEventListener(
      "drop",
      function(e) {
        e.preventDefault();
      },
      false
    );
  }, []);
  return (
    <form
      className="drop-area"
      style={{ opacity: active ? ".5" : 1 }}
      onDrop={_dropEnded}
      onDragOver={_dragOver}
      onDragLeave={_dragLeave}
    >
      <p>Drop Files here!</p>
      <input type="file" id="input-file" onChange={_selectFile} />
      <label htmlFor="input-file">click here to select file</label>
      <br />
      <p>File name: {selectedFile && selectedFile.name}</p>
    </form>
  );
};

export default Drag;
