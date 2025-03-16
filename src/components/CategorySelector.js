import { useState, useEffect } from "react";

const CategorySelector = ({ Select }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://127.0.0.1:8000/tag/category/");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // پاک‌سازی مقادیر وابسته هنگام تغییر والد
  useEffect(() => {
    setSelectedSubcategory(null);
    setSelectedTopic(null);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedTopic(null);
  }, [selectedSubcategory]);

  // ارسال مقدار انتخاب‌شده فقط در صورت معتبر بودن
  useEffect(() => {
    if (selectedTopic) {
      Select(selectedTopic);
    }
  }, [selectedTopic]);

  return (
    <div>
      {loading ? (
        <p>در حال بارگیری...</p>
      ) : (
        <>
          {/* دسته‌بندی سطح اول */}
          <select
            value={selectedCategory?.id || ""}
            onChange={(e) =>
              setSelectedCategory(
                categories.find((c) => c.id === Number(e.target.value)) || null
              )
            }
          >
            <option value="">انتخاب موضوع کلی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* زیرمجموعه دسته‌بندی */}
          {selectedCategory?.subcategories?.length > 0 && (
            <select
              value={selectedSubcategory?.id || ""}
              onChange={(e) =>
                setSelectedSubcategory(
                  selectedCategory.subcategories.find(
                    (c) => c.id === Number(e.target.value)
                  ) || null
                )
              }
            >
              <option value="">انتخاب زیرمجموعه</option>
              {selectedCategory.subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          )}

          {/* دسته‌بندی سطح سوم */}
          {selectedSubcategory?.subcategories?.length > 0 && (
            <select
              value={selectedTopic?.id || ""}
              onChange={(e) =>
                setSelectedTopic(
                  selectedSubcategory.subcategories.find(
                    (c) => c.id === Number(e.target.value)
                  ) || null
                )
              }
            >
              <option value="">انتخاب مبحث</option>
              {selectedSubcategory.subcategories.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </div>
  );
};

export default CategorySelector;

// import { useState, useEffect} from "react";

// const CategorySelector = ({Select}) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/tag/category/");
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error("خطا در دریافت دسته‌بندی‌ها:", error);
//       }
//     };
  
//     fetchCategories();
//   }, []);
// //   useEffect(
// //     ()=>{
// //         try{
// //             Select(selectedTopic)
// //         }
// //         catch{

// //         }
// //     },[selectedTopic]
// //   )
// const Topic=(e)=>{
//     setSelectedTopic(selectedSubcategory.subcategories.find(c => c.id === Number(e.target.value)))
//     Select(e.target.value)
// }
//   return (
//     <div>
//       {/* دسته‌بندی سطح اول */}
//       {/* <select onChange={(e) => setSelectedCategory(categories.find(c => c.id === Number(e.target.value)))}> */}
//       <select onChange={Topic}>
//         <option value="">انتخاب موضوع کلی</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>{cat.name}</option>
//         ))}
//       </select>

//       {/* زیرمجموعه دسته‌بندی */}
//       {selectedCategory && selectedCategory.subcategories.length > 0 && (
//         <select onChange={(e) => setSelectedSubcategory(selectedCategory.subcategories.find(c => c.id === Number(e.target.value)))}>
//           <option value="">انتخاب زیرمجموعه</option>
//           {selectedCategory?.subcategories?.map((sub) => (
//             <option key={sub.id} value={sub.id}>{sub.name}</option>
//           ))}
//         </select>
//       )}

//       {/* دسته‌بندی سطح سوم */}
//       {selectedSubcategory && selectedSubcategory.subcategories.length > 0 && (
//         <select onChange={(e) => setSelectedTopic(selectedSubcategory.subcategories.find(c => c.id === Number(e.target.value)))}>
//           <option value="">انتخاب مبحث</option>
//           {selectedSubcategory?.subcategories?.map((topic) => (
//             <option key={topic.id} value={topic.id}>{topic.name}</option>
//           ))}
//         </select>
//         )}
//         </div>
//       );
//     };
    
//     export default CategorySelector;
