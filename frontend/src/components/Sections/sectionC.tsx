import img4 from '@/assets/images/img4.jpeg';
import { content } from '@/content/sectionC';

export default function SectionC() {
  return (
    <section className="strategy-section">
      <div className="max-h-[514px] flex items-center strategy-container ">
        <div className="strategy-text">
          <h2>{content.title}</h2>
          <ul className="strategy-list">
            <li>
              <h3>{content.items[0].title}</h3>
              <p>{content.items[0].text}</p>
            </li>
            <li>
              <h3>{content.items[1].title}</h3>
              <p>{content.items[1].text}</p>
            </li>
            <li>
              <h3>{content.items[2].title}</h3>
              <p>{content.items[2].text}</p>
            </li>
          </ul>
        </div>
        <div
          className="flex-[1_1_10%] min-h-[500px] bg-cover bg-center rounded-[20px] max-h-[500px] "
          style={{ backgroundImage: `url(${img4})` }}
        ></div>
      </div>
    </section>
  );
}