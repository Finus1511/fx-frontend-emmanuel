import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const FAQIndex = (props) => {
  return (
    <>
      <div className="creator-list-sec sm-padding">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={8} lg={9} className="text-center">
              <div className="section-title">
                <div className="title-before">
                  <h2>{t("landing_page.faq.header")}</h2>
                  <p>{t("landing_page.faq.content")}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={12} xl={10}>
              <div className="faq-accordion">
                <div
                  class="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                      <h4 class="panel-title">
                        <a
                          role="button"
                          className="accordion-toggle"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          {t("landing_page.faq.first.header")}
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseOne"
                      class="panel-collapse collapse in"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                    >
                      <div class="panel-body">
                      {t("landing_page.faq.first.content")}
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                      <h4 class="panel-title">
                        <a
                          class="collapsed accordion-toggle"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          {t("landing_page.faq.second.header")}
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseTwo"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingTwo"
                    >
                      <div class="panel-body">
                      {t("landing_page.faq.second.content")}
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                      <h4 class="panel-title">
                        <a
                          class="collapsed accordion-toggle"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          {t("landing_page.faq.third.header")}
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseThree"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingThree"
                    >
                      <div class="panel-body">
                      {t("landing_page.faq.second.content")}
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingFour">
                      <h4 class="panel-title">
                        <a
                          class="collapsed accordion-toggle"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          {t("landing_page.faq.fourth.header")}
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseFour"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingFour"
                    >
                      <div class="panel-body">
                      {t("landing_page.faq.fourth.content")}
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingFive">
                      <h4 class="panel-title">
                        <a
                          class="collapsed accordion-toggle"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseFive"
                          aria-expanded="false"
                          aria-controls="collapseFive"
                        >
                          {t("landing_page.faq.fifth.header")}
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseFive"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingFive"
                    >
                      <div class="panel-body">
                      {t("landing_page.faq.fifth.content")}
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingSix">
                      <h4 class="panel-title">
                        <a
                          class="collapsed accordion-toggle"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseSix"
                          aria-expanded="false"
                          aria-controls="collapseSix"
                        >
                          {t("landing_page.faq.sixth.header")}
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseSix"
                      class="panel-collapse collapse"
                      role="tabpanel"
                      aria-labelledby="headingSix"
                    >
                      <div class="panel-body">
                        {t("landing_page.faq.sixth.content")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FAQIndex;
