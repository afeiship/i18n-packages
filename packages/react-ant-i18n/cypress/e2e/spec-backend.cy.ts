describe('en-US/zh-CN basic e2e test', () => {
  const baseURL = 'http://localhost:3000?mode=backend';
  it('init ui should have english elements', () => {
    cy.visit(baseURL);
    // h1 have text "hello world"
    cy.get('h1').should('have.text', 'hello world');
    // code tag should have color red
    cy.get('code').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('.ant-empty-description').should('have.text', 'No Data');
    // input should have placeholder
    cy.get(':nth-child(1) > .ant-picker > .ant-picker-input > input').should(
      'have.attr',
      'placeholder',
      'Select date'
    );
    cy.get(':nth-child(2) > .ant-picker > .ant-picker-input > input').should(
      'have.attr',
      'placeholder',
      'Select time'
    );
    cy.get('.ant-btn > span').should('have.text', 'Open a Modal');
  });

  it('change language to chinese elements', () => {
    cy.visit(baseURL);
    cy.get('.ant-select-selector').click();
    cy.get('.ant-select-item-option-content').contains('中文').click();

    cy.get('h1').should('have.text', '你好世界');
    // code tag should have color red
    cy.get('.ant-empty-description').should('have.text', '暂无数据');
    // input should have placeholder
    cy.get(':nth-child(1) > .ant-picker > .ant-picker-input > input').should(
      'have.attr',
      'placeholder',
      '请选择日期'
    );
    cy.get(':nth-child(2) > .ant-picker > .ant-picker-input > input').should(
      'have.attr',
      'placeholder',
      '请选择时间'
    );
    cy.get('.ant-btn > span').should('have.text', '打开对话框');
  });

  it('modal should have translated', () => {
    cy.visit(baseURL);
    cy.get('.ant-btn > span').click();
    cy.get('.ant-modal-body').should('have.text', 'From a modal');
    cy.get('.ant-modal-footer > .ant-btn.ant-btn-default > span').should('have.text', 'Cancel');
    cy.get('.ant-modal-footer > .ant-btn.ant-btn-primary > span').should('have.text', 'OK');

    // get nx from window.nx
    cy.window().then((win) => {
      win['nx'].i18n.changeLanguage('zh-CN');
      cy.get('.ant-modal-footer > .ant-btn.ant-btn-default > span').should('have.text', '取 消');
      cy.get('.ant-modal-footer > .ant-btn.ant-btn-primary > span').should('have.text', '确 定');

      // close modal
      cy.get('.ant-modal-footer > .ant-btn.ant-btn-default > span').click();
    });
  });

  it('moment should have translated', () => {
    cy.visit(baseURL);

    cy.get(':nth-child(1) > .ant-picker > .ant-picker-input > input').click();
    // body > div:nth-child(3) > div > div > div > div > div.ant-picker-date-panel > div.ant-picker-body > table > thead > tr > th:nth-child(1)
    cy.get('.ant-picker-date-panel table thead > tr > th:nth-child(1)').should('have.text', 'Su');
    cy.get('.ant-picker-date-panel table thead > tr > th:nth-child(2)').should('have.text', 'Mo');
    cy.get('.ant-picker-today-btn').should('have.text', 'Today');

    cy.get(':nth-child(2) > .ant-picker > .ant-picker-input > input').click();
    cy.get('.ant-picker-now-btn').should('have.text', 'Now');

    // select language to zh-CN
    cy.get('.ant-select-selector').click();
    cy.get('.ant-select-item-option-content').contains('中文').click();

    cy.get(':nth-child(1) > .ant-picker > .ant-picker-input > input').click();
    cy.get('.ant-picker-date-panel table thead > tr > th:nth-child(1)').should('have.text', '一');
    cy.get('.ant-picker-date-panel table thead > tr > th:nth-child(2)').should('have.text', '二');
    cy.get('.ant-picker-today-btn').should('have.text', '今天');
    cy.get(':nth-child(2) > .ant-picker > .ant-picker-input > input').click();
    cy.get('.ant-picker-now-btn').should('have.text', '此刻');

    // 关闭弹框
    cy.get('h1').click();
  });
});
