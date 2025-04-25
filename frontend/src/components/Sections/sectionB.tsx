import BookIco from '@/assets/images/ico/BookIco.png';
import BookPcIco from '@/assets/images/ico/BookPcIco.png';
import PcIco from '@/assets/images/ico/PcIco.png';
import img2 from '@/assets/images/img2.jpeg';
import img3 from '@/assets/images/img3.jpeg';
import img4 from '@/assets/images/img4.jpeg';
import img5 from '@/assets/images/img5.jpeg';
import backPicture2 from '@/assets/images/backNeural.svg';

import { content } from '@/content/sectionB';

export default function SectionB() {
  return (
    <section className="bg-gray-50 py-12 px-4 relative max-h-[580px] overflow-hidden">
      <img className='absolute opacity-10 top-0' src={backPicture2} alt="neural-background"></img>
      <div className="services-container">
        <h2>{content.title}</h2>

        <div className="services-list">
          <div
            className="service-card"
            style={{ backgroundImage: `url(${img2})` }}
          >
            <img src={BookIco} alt="" className="card-icon" />
            <h4>{content.firstBox.title}</h4>
            <p>{content.firstBox.description}</p>
          </div>

          <div
            className="service-card"
            style={{ backgroundImage: `url(${img3})` }}
          >
            <img src={BookPcIco} alt="" className="card-icon" />
            <h4>{content.secondBox.title}</h4>
            <p>{content.secondBox.description}</p>
          </div>

          <div
            className="service-card"
            style={{ backgroundImage: `url(${img4})` }}
          >
            <img src={BookIco} alt="" className="card-icon" />
            <h4>{content.thirdBox.title}</h4>
            <p>{content.thirdBox.description}</p>
          </div>

          <div
            className="service-card"
            style={{ backgroundImage: `url(${img5})` }}
          >
            <img src={PcIco} alt="" className="card-icon" />
            <h4>{content.fourthBox.title}</h4>
            <p>{content.fourthBox.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}