import { compose } from 'redux';
import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/EmployeePage/saga';
import reducer from 'containers/EmployeePage/reducer';
import NewEmployeePage from 'containers/EmployeePage/NewEmployee';
import { getEmployeeDetail } from 'containers/EmployeePage/actions';
import { makeSelectEmployeeDetail } from 'containers/EmployeePage/selectors';
import EmployeeNewLoader from 'components/ContentLoader/EmployeeNewLoader';
import 'rc-slider/assets/index.css';
import Slider, { SliderTooltip } from 'rc-slider';
import { BallTriangle } from  'react-loader-spinner'
import axios from 'axios';
import { toast } from 'react-toastify';
import Switch from "react-switch";
const { Handle } = Slider;
function Examination() {

  const [articleUrl,setArticleUrl] = useState('');
  const [articleText, setArticleText] = useState('');
  const [volume, setVolume] = useState(5);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailed, setIsDetailed] = useState(false);
  const summaryRef = useRef(null);

  const onChangeArticleUrl = e => {
    setArticleUrl(e.target.value);
  };

  const onChangeArticleText = e =>{
     setArticleText(e.target.value);
  }

  const onChangeVolume = value =>{
    setVolume(value);
  }

  const onSubmmit = () =>{
    setSummary([]);
    setIsLoading(true);
    setIsSubmit(true);
  }

  const handleChangeIsDetailed = (checked)=>{
    setIsDetailed(checked);
  }

  const listItems = summary.map((item,index)=>
    <li key={index}>{item}</li>
  );

  useEffect(()=>{
    if(isSubmit&&articleText || isSubmit&&articleUrl){
      console.log({articleUrl,articleText,volume});
      const options = articleText?{
        method : 'POST',
        url: 'https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-text/',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
          'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
        },
        data: {
          text: articleText,
          num_sentences: volume-1,
        }
      }:{
        method : 'POST',
        url: 'https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-url/',
        headers: {
          'content-type': 'application/json',
          'x-rapidapi-host': 'tldrthis.p.rapidapi.com',
          'x-rapidapi-key': '38e60424b8msh64268c080a9e889p1d1ff1jsndcf349070004'
        },
        data: {
          url: articleUrl,
          num_sentences: volume-1,
          is_detailed: false,
        }
      }
    if(isDetailed){
      options.data.is_detailed = true;
    }
    console.log(options.data);
    axios.request(options).then(function (response) {
      const summary = response.data.summary.map(e=>e.replace(/(\r\n|\n|\r)/gm, ""));
      setIsSubmited(true);
      setSummary(summary);
      setIsLoading(false);
      setIsSubmit(false);
      summaryRef.current.scrollIntoView({behavior: 'smooth'});
    }).catch(function (error) {
      setIsSubmited(false);
      setSummary([]);
      setIsLoading(false);
      setIsSubmit(false);
      toast.error('Something went wrong during summarization!');
    });}
    
  },[isSubmit])

  const marks = {
    5: (
      <div className="marks-0 marks-multi">
        <p>5</p>
      </div>
    ),
    10: <div className="marks" />,
    15: <div className="marks" />,
    20: <div className="marks" />,
    25: <div className="marks" />,
    30: <div className="marks" />,
    35: (
      <div className="marks-10 marks-multi">
        <p>35</p>
      </div>
    ),
  };

  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value}`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <div className="page-common">
      <div className="text-content">
        <h2>Enter an Article URL or paste your Text</h2>
      </div>
      <div className="main-form">
        <div className="input-text">
          <h3>Enter Article URL</h3>
          <input value={articleUrl} id="text_url" name="text_url" placeholder="https://..." onChange={onChangeArticleUrl}/>
        </div>
      </div>
      <div className="text-or">
        <h3>OR</h3>
      </div>
      <div className="main-form">
        <div className="input-text">
          <h3>Paste Article Text</h3>
          <textarea value={articleText} id="article_text" name="article_text" rows="3" onChange={onChangeArticleText}/>
        </div>
      </div>
      <div className="sum-volume">
        <div className="volume-slider">
          <h3>Sentences</h3>
          <Slider
            min={5}
            max={35}
            defaultValue={5}
            marks={marks}
            handle={handle}
            onChange={onChangeVolume}
          />
        </div>
      </div>
      <div className="sum-volume">
        <h3>Key Sentences</h3>
        <Switch onChange={handleChangeIsDetailed} checked={isDetailed} uncheckedIcon={false} checkedIcon={false} className="switch-button"/>
        <h3>Human-like Summary</h3>
      </div>
      <div className="page-sum">
        <div className="button-common text-center mt-5">
          <button type="button" className="btn btn-primary mt-5" onClick={onSubmmit}>
            Summarize This
          </button>
        </div>
      </div>
      {
        isLoading && summary.length=== 0 &&
        <div className="text-content">
          <BallTriangle
            heigth="100"
            width="100"
            color='#00bab4'
            ariaLabel='loading'
          />
        </div>}
        { summary.length!== 0  &&
        <>
        <div className="text-content" ref={summaryRef}>
        <h2>SUMMARY</h2>
        </div>
        <div className="summary">
        <div className="summary-text">
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
      </>
      }
    </div>
  );
}

export default Examination;
