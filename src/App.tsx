import { useEffect, useRef } from 'react';
import './styles/app.css';

function App() {

  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ref.current.style.opacity = '1';
  }, [])

  return (
    <div className='page guide-page' ref={ref}>
      <img
        className="main-pic"
        src={require('./images/halg_logo_icon_@2x.png')}
        alt="欢乐购"
      />
      <div className="title">欢乐购</div>
      <img
        className="sub-pic"
        src={require('./images/slogn_word_icon_@2x.png')}
        alt="欢乐购"
      />
      <div className="iconfont arrow-icon">&#xe60c;</div>
    </div>
  );
}

export default App;