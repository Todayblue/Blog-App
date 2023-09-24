"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { TOOLS_CREATE } from "./constants";

type EditorProps = {
  value?: string;
  onChange: (value: string) => void; // Change the type of onChange
  placeholder?: string;
};

const Editor = ({ value, onChange, placeholder }: EditorProps) => {
  const modules = {
    toolbar: TOOLS_CREATE,
  };

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className="max-w-4xl">
      <ReactQuill
        placeholder={placeholder}
        value={value}
        theme="snow"
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
};

export default Editor;
