import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image1 from '../static/Home/1.jpg';
import image2 from '../static/Home/2.jpg';
import image3 from '../static/Home/3.jpg';
import image4 from '../static/Home/4.jpg';
import image6 from '../static/Home/6.jpg';
import { useState, useEffect } from 'react';

const MySlider = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="rounded-xl shadow-lg"
      >
        {[image4, image6, image1, image2, image3].map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`slide-${index + 1}`}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default MySlider

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import image1 from '../static/Home/1.jpg'
// import image2 from '../static/Home/2.jpg'
// import image3 from '../static/Home/3.jpg'
// import image4 from '../static/Home/4.jpg'
// import image6 from '../static/Home/6.jpg'
// import { useState,useEffect } from 'react';

// const MySlider = () => {
//   const[screenMobile,setIsMobile]=useState(window.innerWidth < 768)
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   return (
//     <>  
      
//           {
//             screenMobile?
//               <Swiper
//       modules={[Navigation, Pagination, Autoplay]} 
//       spaceBetween={5} 
//       slidesPerView={1} 
//       navigation 
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 3000,disableOnInteraction: false }}
//       loop={true}
     
//     >
//       <SwiperSlide >
//             <img src={image4} alt="slide1"/>  
//       </SwiperSlide>
//       <SwiperSlide>
//           <img src={image6} alt='slide3'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image1} alt='slide4'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image2} alt='slide5'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image6} alt='slide6'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image3} alt='slide5'/>
//       </SwiperSlide>
//     </Swiper>
//             :
//               <Swiper
//       modules={[Navigation, Pagination, Autoplay]} 
//       spaceBetween={1} 
//       slidesPerView={1} 
//       navigation 
//       pagination={{ clickable: true }}
//       autoplay={{ delay: 3000,disableOnInteraction: false }}
//       loop={true}
     
//     >
//       <SwiperSlide>
//             <img src={image4} alt="slide1"/>  
//       </SwiperSlide>
//       <SwiperSlide>
//           <img src={image6} alt='slide3'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image1} alt='slide4'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image2} alt='slide5'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image6} alt='slide6'/>
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={image3} alt='slide5'/>
//       </SwiperSlide>
//     </Swiper>
            
//           }
       
//     </>
//   );
// };

// export default MySlider;
