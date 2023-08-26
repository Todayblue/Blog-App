// import React, { useEffect, useState } from "react";
// import getCategories from "../action/getCategories";
// import { Category } from "@/types/blog";
// import Select from "react-select";

// const TagSelect = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     async function fetchCategories() {
//       const fetchedCategories = await getCategories();
//       setCategories(fetchedCategories);
//     }

//     fetchCategories();
//   }, []);

//   // Map categories to the format expected by the Select component
//   const categoryOptions = categories.map((category) => ({
//     value: category.id,
//     label: category.name,
//   }));

//   const handleSelectChange = (selectedOptions: any) => {
//     setSelectedOption(selectedOptions);

//     // If you want to log the selected category IDs and names
//     const selectedIds = selectedOptions.map((option: any) => option.value);
//     const selectedNames = selectedOptions.map((option: any) => option.label);

//     console.log("Selected Category IDs:", selectedIds);
//     console.log("Selected Category Names:", selectedNames);
//   };

//   return (
//     <Select
//       isMulti
//       name="categories"
//       options={categoryOptions}
//       className="basic-multi-select"
//       classNamePrefix="select"
//       value={selectedOption}
//       onChange={handleSelectChange} // Attach the onChange event handler
//     />
//   );
// };

// export default TagSelect;
