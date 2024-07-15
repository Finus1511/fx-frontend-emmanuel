import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const FeatureSection = () => {
  return (
    <>
      <div className="new-featur-wrapped sm-padding">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8} lg={9} className="text-center">
              <div className="section-title">
                <div className="title-before">
                  <h2>{t("landing_page.features.header")}</h2>
                  <p>
                  {t("landing_page.features.content")}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={4} lg={4} className="text-center">
              <div className="featur-card-wrapped">
                <div className="featur-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="VR Exploration"
                    viewBox="0 0 64 64"
                    width="36"
                    height="36"
                    fill="#9F4298"
                  >
                    <path d="M32 34c-7.72 0-14 6.28-14 14s6.28 14 14 14 14-6.28 14-14-6.28-14-14-14zm6.95 8.32l-3 9c-.1.3-.33.53-.63.63l-9 3A.86.86 0 0126 55c-.26 0-.52-.1-.71-.29a.99.99 0 01-.24-1.02l3-9c.1-.3.33-.53.63-.63l9-3c.36-.12.75-.03 1.02.24s.36.66.24 1.02z"></path>
                    <path d="M62 11.5c0-4.21-6.29-7.76-16.84-9.49-.29-.05-.59.04-.81.23S44 2.71 44 3v16.19c-3.56.51-7.6.81-12 .81s-8.44-.3-12-.81V3c0-.29-.13-.57-.35-.76s-.52-.27-.81-.23C8.29 3.74 2 7.29 2 11.5c0 .12.02.23.03.34 0 .05-.03.1-.03.16v32c0 3.49 4.78 6.53 13.12 8.34a.995.995 0 001.19-.77c.12-.54-.23-1.07-.76-1.19C8.54 48.86 4.01 46.35 4.01 44V15.79c4.64 4.06 16.6 6.21 28 6.21s23.36-2.15 28-6.21V44c0 2.35-4.53 4.86-11.54 6.38a1.003 1.003 0 00.22 1.98c.07 0 .14 0 .21-.02 8.34-1.81 13.12-4.85 13.12-8.34V12c0-.06-.02-.1-.03-.16 0-.11.03-.23.03-.34z"></path>
                  </svg>
                </div>
                <div className="featur-card-info">
                  <h3>{t("landing_page.features.ve")}</h3>
                </div>
              </div>
            </Col>
            <Col md={4} lg={4} className="text-center">
              <div className="featur-card-wrapped">
                <div className="featur-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="#9F4298"
                    data-name="Layer 1"
                    viewBox="0 0 512 512"
                  >
                    <path d="M485.5 336.44l-80.719-46.6a52.988 52.988 0 00-72.3 19.372c-4.2 7.277-11.571 16.436-22.821 18.736a32.8 32.8 0 01-27.631-6.208c-30.378-22.8-68.97-61.388-91.764-91.763a32.793 32.793 0 01-6.209-27.631c2.3-11.252 11.459-18.622 18.736-22.823a52.99 52.99 0 0019.373-72.3L175.56 26.5a52.612 52.612 0 00-65.179-22.8l-1 .39C70.9 19.2 42.755 30.794 31.176 42.374.949 72.6-7.49 116.712 6.772 169.94c16.77 62.588 64.735 136.831 131.6 203.692s141.1 114.825 203.692 131.6a184.507 184.507 0 0047.6 6.749c32.132 0 59.3-10.483 79.968-31.153 11.576-11.586 23.168-39.728 38.283-78.228l.385-.981a52.611 52.611 0 00-22.8-65.179zM471.067 387l-.385.982c-7.337 18.687-22.6 57.571-29.34 64.559-19.823 19.823-49.745 24.549-88.929 14.051-117.669-31.529-275.475-189.335-307-307-10.5-39.186-5.772-69.106 14.04-88.919 7-6.747 45.872-22.009 64.555-29.344l1-.391a13.314 13.314 0 014.878-.941 12.682 12.682 0 0111.041 6.51l46.6 80.719a12.991 12.991 0 01-4.731 17.658c-20.336 11.741-33.805 29.3-37.926 49.45a72.624 72.624 0 0013.4 59.653c25.177 33.551 66.2 74.57 99.749 99.748a72.627 72.627 0 0059.654 13.4c20.148-4.122 37.709-17.591 49.449-37.926a12.941 12.941 0 0117.658-4.731l80.719 46.6A12.7 12.7 0 01471.067 387zM286.455 232.419h128.106c16.544 0 30.243-12.935 32.263-29.606l37.6 15.382A20 20 0 00512 199.684V84.229a20 20 0 00-27.572-18.511L446.824 81.1c-2.02-16.67-15.719-29.606-32.263-29.606H286.455c-17.932 0-32.52 15.194-32.52 33.87v113.185c0 18.676 14.588 33.87 32.52 33.87zM472 169.9l-24.919-10.2v-35.489L472 114.018zM293.935 91.5H407.08v100.919H293.935z"></path>
                  </svg>
                </div>
                <div className="featur-card-info">
                  <h3>{t("landing_page.features.call")}</h3>
                </div>
              </div>
            </Col>
            <Col md={4} lg={4} className="text-center">
              <div className="featur-card-wrapped">
                <div className="featur-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="#9F4298"
                    viewBox="-50 0 512 512"
                  >
                    <path d="M412.66 446.145L377.613 122.09c-.863-7.965-7.59-14.008-15.605-14.008h-57.922v-10.5C304.09 43.777 260.312 0 206.504 0c-53.805 0-97.582 43.777-97.582 97.582v10.5H50.996c-8.016 0-14.742 6.04-15.605 14.008L.344 446.145a59.539 59.539 0 0014.867 46.113A59.539 59.539 0 0059.46 512h294.078a59.553 59.553 0 0044.254-19.742 59.543 59.543 0 0014.867-46.113zM140.312 97.582c0-36.496 29.696-66.191 66.192-66.191 36.5 0 66.191 29.695 66.191 66.191v10.5H140.313zM374.43 471.289c-5.395 6.008-12.813 9.32-20.887 9.32H59.461c-8.074 0-15.492-3.312-20.89-9.32-5.391-6.012-7.887-13.742-7.016-21.77l33.53-310.042h43.837v39.996c0 8.668 7.027 15.695 15.695 15.695s15.695-7.027 15.695-15.695v-39.996h132.383v39.996c0 8.668 7.028 15.695 15.696 15.695 8.671 0 15.699-7.027 15.699-15.695v-39.996h43.828l33.531 310.043c.867 8.027-1.625 15.757-7.02 21.77zm0 0"></path>
                    <path d="M206.34 284.887h23.117c8.668 0 15.695-7.028 15.695-15.696s-7.027-15.695-15.695-15.695h-7.418v-6.066c0-8.668-7.031-15.696-15.7-15.696-8.667 0-15.694 7.028-15.694 15.696v9.578c-13.602 6.379-23.114 20.77-23.114 37.469 0 22.601 17.41 40.984 38.809 40.984 4.023 0 7.422 4.39 7.422 9.59 0 5.203-3.399 9.594-7.422 9.594h-23.113c-8.668 0-15.696 7.027-15.696 15.695s7.028 15.695 15.696 15.695h7.418v6.063c0 8.672 7.027 15.699 15.695 15.699s15.7-7.027 15.7-15.7v-9.574c13.597-6.378 23.112-20.77 23.112-37.472 0-22.598-17.41-40.98-38.812-40.98-4.02 0-7.418-4.395-7.418-9.594 0-5.2 3.398-9.59 7.418-9.59zm0 0"></path>
                  </svg>
                </div>
                <div className="featur-card-info">
                  <h3>{t("landing_page.features.sell")}</h3>
                </div>
              </div>
            </Col>
            <Col md={4} lg={4} className="text-center">
              <div className="featur-card-wrapped">
                <div className="featur-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    enableBackground="new 0 0 512 512"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    width="36"
                    height="36"
                    fill="#9F4298"
                  >
                    <path d="M304 96H112c-8.832 0-16 7.168-16 16s7.168 16 16 16h192c8.832 0 16-7.168 16-16s-7.168-16-16-16zM240 160H112c-8.832 0-16 7.168-16 16s7.168 16 16 16h128c8.832 0 16-7.168 16-16s-7.168-16-16-16z"></path>
                    <path d="M352 0H64C28.704 0 0 28.704 0 64v320c0 6.208 3.584 11.872 9.216 14.496A16.232 16.232 0 0016 400c3.68 0 7.328-1.28 10.24-3.712L117.792 320H352c35.296 0 64-28.704 64-64V64c0-35.296-28.704-64-64-64zm32 256c0 17.632-14.336 32-32 32H112c-3.744 0-7.36 1.312-10.24 3.712L32 349.856V64c0-17.632 14.336-32 32-32h288c17.664 0 32 14.368 32 32v192z"></path>
                    <path d="M448 128c-8.832 0-16 7.168-16 16s7.168 16 16 16c17.664 0 32 14.368 32 32v270.688l-54.016-43.2A16.12 16.12 0 00416 416H192c-17.664 0-32-14.368-32-32v-16c0-8.832-7.168-16-16-16s-16 7.168-16 16v16c0 35.296 28.704 64 64 64h218.368l75.616 60.512A16.158 16.158 0 00496 512c2.336 0 4.704-.512 6.944-1.568A16.05 16.05 0 00512 496V192c0-35.296-28.704-64-64-64z"></path>
                  </svg>
                </div>
                <div className="featur-card-info">
                  <h3>{t("landing_page.features.chat")}</h3>
                </div>
              </div>
            </Col>
            <Col md={4} lg={4} className="text-center">
              <div className="featur-card-wrapped">
                <div className="featur-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    fill="#9F4298"
                    viewBox="0 0 512 512"
                  >
                    <path d="M502.029 286.405c-15.682-20.165-43.971-23.982-64.353-9.844l-53.648 35.893c-7.782-13.897-22.646-23.317-39.677-23.317h-48.456c-19.667-18.344-45.861-28.755-72.877-28.755-46.576 0-76.043 21.891-93.508 42.637-3.277-6.678-11.073-10.046-18.299-7.577l-101.06 34.544C2.318 332.663-1.87 341.194.81 349.032l52.245 152.816c2.681 7.842 11.209 12.019 19.044 9.341l101.061-34.544c7.833-2.677 12.021-11.208 9.341-19.046l-.842-2.462 121.392-3.754c34.18-.049 66.958-10.547 94.803-30.364l94.237-67.033c21.955-15.621 26.473-46.302 9.938-67.581zM76.589 477.951l-42.54-124.43 72.674-24.841 42.54 124.43zm398.112-148.408l-94.238 67.033c-22.803 16.23-49.654 24.808-77.649 24.808-.155 0-.309.002-.463.007-136.475 4.22-126.859 3.504-130.512 5.017l-30.248-88.477c11.161-19.847 35.05-47.551 81.429-47.551 20.709 0 39.914 7.714 55.979 24.216a15.054 15.054 0 0010.738 4.539h54.616c8.518 0 15.448 6.926 15.448 15.439 0 8.442-6.83 15.439-15.448 15.439h-80.534c-8.284 0-14.999 6.716-14.999 15s6.716 15 14.999 15h80.534c21.667 0 39.293-15.008 44.109-34.431l66.011-44.164.251-.172c7.483-5.229 17.875-3.82 23.622 3.569 6.044 7.781 4.391 19.009-3.645 24.728z"></path>
                    <circle cx="81.644" cy="374.03" r="15"></circle>
                    <path d="M322.597 255.393c70.41 0 127.692-57.284 127.692-127.696S393.007 0 322.597 0 194.905 57.284 194.905 127.696s57.282 127.697 127.692 127.697zm0-225.393c53.869 0 97.693 43.826 97.693 97.697s-43.825 97.697-97.693 97.697-97.694-43.826-97.694-97.697S268.728 30 322.597 30z"></path>
                    <path d="M338.853 112.926c-7.625-2.689-20.188-7.226-26.549-12.21-.521-.41-1.253-2.31-.732-5.1.251-1.32 1.404-5.74 5.695-7.03 6.996-2.119 13.441-.416 17.025 2.52 0 0 7.78 7.51 17.736 1.34 9.956-6.18 6.858-16.71 6.016-18.68-.842-1.96-3.619-4.94-3.619-4.94-3.459-3.18-9.555-7.04-17.476-9.29v-1.57c0-8.05-6.367-14.62-14.348-14.98-8.788-.381-15.731 6.623-15.731 14.98v2.48c-12.773 4.53-22.218 15.71-24.855 29.61-2.547 13.49 1.945 26.61 11.721 34.26 9.601 7.507 23.491 12.816 35.102 16.9 7.871 2.77 8.673 8.42 7.951 12.66-.993 5.89-5.835 12.25-14.187 12.69-11.509.426-14.607-.948-21.205-5.26-6.958-4.53-16.273-2.59-20.825 4.35-4.542 6.93-2.597 16.23 4.352 20.76 8.262 5.38 14.779 8.02 21.947 9.23v1.78c0 8.414 7 15.359 15.731 14.98 7.981-.36 14.348-6.93 14.348-14.98v-3.39c16.503-5.79 27.051-20.58 29.507-35.18 3.438-20.44-7.651-38.89-27.604-45.93z"></path>
                  </svg>
                </div>
                <div className="featur-card-info">
                  <h3>{t("landing_page.features.payperview")}</h3>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default FeatureSection;