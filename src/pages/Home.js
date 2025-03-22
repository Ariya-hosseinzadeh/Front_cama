import { Link } from "react-router-dom";
import MySlider from '../components/slider'
import HeroSection from '../components/HeroSection'
import image1 from '../static/Home/main/1.png'
import image2 from '../static/Home/main/2.png'
import image4 from '../static/Home/main/4.png'
import image3 from '../static/Home/main/3.png'
import image5 from '../static/Home/main/5.webp'

const Home=()=>{
  
    return(
        <>
           <div className="flex flex-col items-center ">
                <HeroSection/>
                <MySlider/>
                <div>
                <div className="flex flex-col gap-16 px-8 sm:px-16 lg:px-32 py-16 bg-gradient-to-b from-gray-100 to-white">
  {/* کلاس‌های آنلاین */}
  <div className="flex flex-col-reverse sm:flex-row items-center gap-12">
    <div className="sm:w-1/2">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-relaxed tracking-tight">
        کلاس‌های آنلاین: <br /> بستری برای یادگیری از بهترین اساتید علمی
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        در کاما می‌توانید یاد بگیرید، آموزش دهید و درآمد کسب کنید. <br />
        ما ارتباطی مستقیم میان اساتید و دانشجویان برقرار کرده‌ایم تا
        <span className="text-blue-600 font-semibold"> دانش بدون مرز</span> جریان یابد.
      </p>
    </div>
    <div className="sm:w-1/2">
      <img src={image1} alt="کلاس آنلاین" className="w-full max-w-lg mx-auto rounded-xl shadow-2xl" />
    </div>
  </div>

  {/* دسترسی به متخصصین */}
  <div className="flex flex-col sm:flex-row items-center gap-12">
    <div className="sm:w-1/2">
      <img src={image2} alt="متخصصین" className="w-full max-w-lg mx-auto rounded-xl shadow-2xl" />
    </div>
    <div className="sm:w-1/2">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-relaxed tracking-tight">
        دسترسی آسان به متخصصین
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        در کاما می‌توانید به متخصصان هر رشته دسترسی داشته باشید، مشاوره بگیرید 
        و مسیر رشد خود را تسریع کنید. <br />
        بهترین متخصصان تنها <span className="text-blue-600 font-semibold">یک کلیک</span> با شما فاصله دارند.
      </p>
    </div>
  </div>

  {/* انجمن‌های علمی */}
  <div className="flex flex-col-reverse sm:flex-row items-center gap-12">
    <div className="sm:w-1/2">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-relaxed tracking-tight">
        شبکه‌ای گسترده از انجمن‌های علمی
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        کاما بستر ارتباطی میان دانشجویان، اساتید و علاقه‌مندان علم است. <br />
        با اتصال به انجمن‌های علمی، در مسیر پیشرفت و 
        <span className="text-blue-600 font-semibold">نوآوری</span> گام بردارید.
      </p>
    </div>
    <div className="sm:w-1/2">
      <img src={image3} alt="انجمن‌های علمی" className="w-full max-w-lg mx-auto rounded-xl shadow-2xl" />
    </div>
  </div>

  {/* تشکیل تیم‌های علمی */}
  <div className="flex flex-col sm:flex-row items-center gap-12">
    <div className="sm:w-1/2">
      <img src={image4} alt="تیم‌های علمی" className="w-full max-w-lg mx-auto rounded-xl shadow-2xl" />
    </div>
    <div className="sm:w-1/2">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-relaxed tracking-tight">
        بستری برای تشکیل تیم‌های علمی
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        در کاما می‌توانید تیم علمی خود را تشکیل دهید، مهارت بیاموزید و 
        در پروژه‌های <span className="text-blue-600 font-semibold">دانش‌بنیان</span> فعالیت کنید. 
        <br /> با همکاری و هم‌افزایی، مسیر موفقیت را هموار کنید.
      </p>
    </div>
  </div>

  {/* بخش پایینی با تصویر و دکمه‌های CTA */}
  <div className="flex flex-col items-center text-center gap-8 px-8 sm:px-16 lg:px-32 py-16">
    {/* تصویر اصلی */}
    <div className="w-full max-w-6xl">
      <img src={image5} alt="تصویر اصلی" className="w-full max-h-[600px] rounded-xl shadow-2xl" />
    </div>

    {/* دکمه‌های CTA */}
    <div className="flex flex-col sm:flex-row gap-6">
      <Link to='/sign-in'>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
          پیوستن به کاما
        </button>
      </Link>
      <Link to='/about-cama'>
        <button className="border border-gray-300 text-gray-800 px-10 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-50 transition-all transform hover:scale-105">
          <abbr title="برای اطلاعات بیشتر درباره کاما کلیک کنید">
            اطلاعات تکمیلی
          </abbr>
        </button>
      </Link>
    </div>
  </div>
</div>


                    {/* <div className='flex flex-row items-center sm:flex-wrap'>
                    <div>
                        <img src='#' alt='Course Online'/>
                    </div>
                    <div>
                        <h1>
                            کلاس های آنلاین :<br/>
                            بستری برای آموزش با دسترسی به بهترین اساتید علمی
                        
                        </h1>
                        <p>
                            شما در کاما می توانید بیاموزید ، آموزش دهید و درآمد کسب کنید <br/>
                            کاما بستر مناسب برای دسترسی آموزگار و آموزنده را مهیا میکند .در کاما <br/>
                            تنها شما با تخصص خودتان در آمد کسب میکنید 
                        </p>
                    </div>
                    
                    </div>
                    <div className='flex flex-row items-center sm:flex-wrap'>
                        <div>
                            <img src='' alt='specialist'/>
                        </div>
                        <div>
                            <h1>
                                دسترسی به متخصصین 
                            </h1>
                            <p>
                                در کاما شما میتوانید به متخصصین هر رشته براحتی دسترسی پیدا کنید <br/>
                                مشورت بگیرید و به تخصص برسید ،بهترین متخصصان هر رشته تنها<br/> با یک کلیک در کنارتان خواهند بود
                            </p>
                        </div>
                        

                    </div>
                    <div className='flex flex-row items-center sm:flex-wrap'>
                        <div>
                            <img src='' alt='Scientific associations' />
                        </div>
                        <div>
                            <h1>
                                کاما شبکه گسترده ای از انجمن های علمی کشور
                            </h1>
                            <p>
                                کاما با فراهم سازی بستری مناسب برای دوست داران علم و صنعت ،شبکه ای بزرگ<br/>
                                از اساتید ،دانشجویان و دوست داران دانش و صنعت را فراهم آورده است.<br/>
                                با اتصال انجمن های مختلف علوم به پیشرفت و آبادانی بیشتر میشتابیم. این انجمن ها زمینه ساز بزرگترین پیشرفت های علمی خواهند بود
                            </p>
                        </div>
                        
                        
                    </div>
                    <div className='flex flex-row items-center sm:flex-wrap'>
                        <div>
                            <img src='' alt='team work'/>
                        </div>
                        <div>
                            <h1>
                                بستری برای ایجاد تیم های علمی 
                            </h1>
                            <p>
                                کاما با ایجاد بستری مناسب باعث آشنایی ترکیب های برنده علمی و مهارتی در زمینه های دانش بنیان <br/>
                                در کاما شما میتوانید تیم علمی تان را ایجاد کنید ،آموزش ببینید ،بکارببرید و به اهداف تان برسید
                            </p>

                        </div>
                        
                    </div> */}

                </div>
           </div>

        </>
    )
}
export default Home