import styled from 'styled-components';

const CollectASRStyled = styled.div`
  .container {
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    height: 500px;
  }
  .box {
    border: 1px solid #f3f2f0;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: white;
    transition: 0.5s;
    flex: 1;
    opacity: 0.8;
  }
  .box:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity linear 0.2s;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: 100%;
  }

  .box:hover {
    opacity: 1;
    flex: 2;
    background-size: 100%;
  }

  .box:hover .content-hover {
    display: block;
    color: #3e4042;
  }

  .box:hover .guide {
    display: block;
  }
  .column-title {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    order: 0;
    width: 30%;
    position: relative;
  }
  .style-title {
    font-size: 48px;
    font-weight: normal;
  }
  a.guide {
    margin-top: 20px;
    display: none;
    font-size: 14px;
    font-weight: 600;
    color: #629ff4;
    text-decoration: underline;
  }
  .column-cta {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    order: 2;
  }
  .primary-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 18px;
  }
  button.record {
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 2;
    border: none;
    border-radius: 50%;
    width: 88px;
    height: 88px;
    background: white;
    opacity: 1;
    cursor: pointer;
  }
  .record.disabled {
    background-color: transparent;
  }
  .background {
    position: absolute;
    margin: 0 auto;
    border-radius: 50%;
    width: 109px;
    height: 109px;
    filter: blur(7.6px);
    transition: opacity 0.2s linear;
    opacity: 0.7;
    background: linear-gradient(90deg, #f89096, #b1b4e5);
  }
`;

export { CollectASRStyled };
