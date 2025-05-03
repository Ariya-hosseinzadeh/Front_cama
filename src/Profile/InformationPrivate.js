import { useContext, useEffect, useState, useRef } from "react";
import useInformationPrivat from "../hooks/useInformationPrivate";
import { AuthContext } from "../components/Context/AuthContext";
import { toast } from "react-toastify";
import SkillUser from "../components/skillsUser";
import { X } from "lucide-react";
import ImageProfile from "../components/imageProfile";

const InformationPrivate = () => {
  const { fetchWithAuth } = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const [degree, setDegree] = useState([
    { name: 'دیپلم', id: '1', value: 'diploma' },
    { name: 'کارشناسی', id: 2, value: 'bachelor' },
    { name: 'کارشناسی ارشد', id: 3, value: 'master' },
    { name: 'دکتری', id: 4, value: 'ph.d' }
  ]);
  const [province, setProvince] = useState(0);
  const [selectDegree, setSelectDegree] = useState('');
  const [errorFetch, setErrorFetch] = useState({});
  const [careers, SetCareer] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [selectJob, setSelectJob] = useState();
  const [onChange, setOnChange] = useState(0);
  
  const { values, errors, handleChange, isValid } = useInformationPrivat({
    bio: "",
    first_name: "",
    last_name: "",
    profileImage: "",
    birth_date: "",
    gender: "",
    addressLine: "",
  });

  useEffect(() => {
    fetch('https://127.0.0.1:8000/users/province/', { method: 'GET' })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setProvinces(data))
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(`https://127.0.0.1:8000/users/cities/by_province/?province_id=${province}`, { method: 'GET' })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setCities(data))
      .catch(error => {
        console.log(error);
      });
  }, [province]);

  useEffect(() => {
    fetch('https://127.0.0.1:8000/users/jobs/', { method: 'GET' })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => SetCareer(data))
      .catch(error => {
        toast.error('خطای ناشناخته !');
      });
  }, [onChange]);

  async function sendData(data) {
    try {
      let response = await fetchWithAuth('https://127.0.0.1:8000/users/profile-information/', {
        method: 'PUT',
        credentials: 'include',
        body: data
      });
      
      if (response.ok) {
        toast.success('اطلاعات شما با موفقیت اضافه شد');
      }
      if (!response.ok) {
        let error_data = await response.json();
        setErrorFetch({ ...error_data });
        console.log(errorFetch);
        throw error_data;
      }
    } catch (error) {
      toast.error('لطفا ارور های زیر را برطرف کنید چنانچه وارد نشده اید! وارد شوید');
    }
  }

  useEffect(() => {
    fetchWithAuth('https://127.0.0.1:8000/users/user-skill/', {
      method: "GET"
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setUserSkill([...data]))
      .catch(error => {
        toast.error('خطا هنگام بارگذاری!');
      });
  }, [onChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('bio', values.bio);
    formData.append('birth_date', values.birth_date);
    formData.append('province', province);
    formData.append('city', city);
    formData.append('job', selectJob);
    formData.append('degree', selectDegree);
    
    sendData(formData);
  };

  function deletSkill(id) {
    fetchWithAuth(`https://127.0.0.1:8000/users/user-skill/${id}/`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setOnChange(prev => prev - 1);
          toast.success(' اطلاعات شما با موفقیت تغییر کرد');
        } else {
          console.error('Failed to delete');
        }
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="min-h-screen bg-[#F0FDF4] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6">
        {/* بخش تصویر پروفایل */}
        <div className="flex justify-center">
          <ImageProfile OnSkillAdded={setOnChange} />
        </div>

        {/* فرم اطلاعات شخصی */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* نام */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">نام:</label>
              <input
                type="text"
                onChange={handleChange}
                name="first_name"
                value={values.first_name}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errorFetch.first_name && <p className="text-red-500 text-xs mt-1">لطفا نام تان را وارد کنید</p>}
            </div>

            {/* نام خانوادگی */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">نام خانوادگی:</label>
              <input
                type="text"
                onChange={handleChange}
                name="last_name"
                value={values.last_name}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errorFetch.last_name && <p className="text-red-500 text-xs mt-1">لطفا نام خانوادگی تان را وارد کنید</p>}
            </div>

            {/* مدرک تحصیلی */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">مدرک تحصیلی:</label>
              <select
                value={selectDegree}
                onChange={(e) => setSelectDegree(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="">مدرک تحصیلی تان را انتخاب کنید</option>
                {degree.map((items) => (
                  <option key={items.id} value={items.value}>
                    {items.name}
                  </option>
                ))}
              </select>
            </div>

            {/* تاریخ تولد */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">تاریخ تولد:</label>
              <input
                onChange={handleChange}
                type="date"
                name="birth_date"
                value={values.birth_date}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              {errors.birth_date && <p className="text-red-500 text-xs mt-1">{errors.birth_date}</p>}
            </div>

            {/* استان */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">استان محل زندگی:</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="">استان محل زندگی تان را انتخاب کنید</option>
                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                  </option>
                ))}
              </select>
              {errorFetch.province && <p className="text-red-500 text-xs mt-1">لطفا استان محل زندگی تان را انتخاب کنید</p>}
            </div>

            {/* شهر */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">شهر محل زندگی:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="">شهر محل زندگی تان را انتخاب کنید</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errorFetch.city && <p className="text-red-500 text-xs mt-1">لطفا شهر محل زندگی تان را انتخاب کنید</p>}
            </div>

            {/* شغل */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">شغل:</label>
              <select
                value={selectJob}
                onChange={(e) => setSelectJob(e.target.value)}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="">شغل خود را انتخاب کنید</option>
                {careers.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>

            {/* جزئیات آدرس */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-800">جزئیات آدرس محل زندگی:</label>
              <input
                onChange={handleChange}
                type="text"
                name="addressLine"
                value={values.addressLine}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* بیوگرافی */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-800">بیوگرافی:</label>
            <textarea
              onChange={handleChange}
              name="bio"
              value={values.bio}
              rows="4"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="بیوگرافی تان را وارد کنید"
            ></textarea>
            {errors.bio && <p className="text-red-500 text-xs mt-1">بیوگرافی شما نمیتواند از 30 کاراکتر کمتر باشد</p>}
          </div>

          {/* دکمه ارسال */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              ذخیره اطلاعات
            </button>
          </div>
        </form>

        {/* بخش مهارت‌ها */}
        <div className="mt-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-blue-800">مهارت‌های شما:</h3>
            <SkillUser OnSkillAdded={setOnChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {userSkill.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
              >
                <h5 className="text-blue-800 font-medium">{item.title}</h5>
                <button
                  onClick={() => deletSkill(item.id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationPrivate;