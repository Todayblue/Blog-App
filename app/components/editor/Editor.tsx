"use client";

import { SetStateAction, useRef } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { TOOLS_CREATE } from "./constants";
import dynamic from "next/dynamic";

type EditorProps = {
  tools?: unknown[];
  value?: string;
  onChange: React.Dispatch<SetStateAction<string>>;
  placeholder?: string;
};

const Editor = ({
  tools = TOOLS_CREATE,
  value,
  onChange,
  placeholder,
}: EditorProps) => {
  const modules = {
    toolbar: tools,
  };

  return (
    <div className="container max-w-lg ">
      <ReactQuill
        placeholder={placeholder}
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
};

export default Editor;

//https://github.com/zenoamaro/react-quill/issues/292
