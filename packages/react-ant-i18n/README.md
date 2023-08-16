# react-ant-i18n
> I18n for antd.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-i18n
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-ant-i18n/dist/style.css";

  // or use sass
  @import "~@jswork/react-ant-i18n/dist/style.scss";

  // customize your styles:
  $react-ant-i18n-options: ()
  ```
2. import js
  ```js
  import React, { useState } from 'react';
  import { useIntl } from '@jswork/react-ant-i18n';
  import styled from 'styled-components';
  import { Select, Space, Table, DatePicker, TimePicker, Avatar, Button, Modal } from 'antd';
  import nx from '@jswork/next';

  const Container = styled.div`
    .ant-avatar {
      margin: 10px 0;
    }
  `;

  const items = [
    { value: 'en-US', label: 'English' },
    { value: 'zh-CN', label: '中文' }
  ];

  export default () => {
    const { t, i18n } = useIntl();
    const [visible, setVisible] = useState<boolean>(false);

    // inject as global for debug
    nx.t = t;
    nx.i18n = i18n;

    const img = i18n.language === 'zh-CN' ? '5' : '1';

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <Space>
              <Avatar src={`https://randomuser.me/api/portraits/lego/${img}.jpg`} size={120} />
              <Select
                value={i18n.language}
                style={{ width: 120 }}
                onChange={(value) => i18n.changeLanguage(value)}
                options={items}
              />
            </Space>
            <Space direction="vertical">
              <h1 style={{ color: '#fff' }}>{t('key')}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('desc', { interpolation: { escapeValue: false } })
                }}
              />
              <Table style={{ width: 600 }} dataSource={[]} />
              <Space>
                {/* @ts-ignore */}
                <DatePicker />
                <TimePicker />
                <Button type="primary" onClick={() => setVisible(true)}>
                  {t('open-a-modal')}
                </Button>
              </Space>
            </Space>
          </header>

          <Modal open={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
            {t('mtxt')}
          </Modal>
        </div>
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/react-ant-i18n/
- https://js.work/works/0f2835cd867fb

## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-i18n/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-i18n
[version-url]: https://npmjs.org/package/@jswork/react-ant-i18n

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-i18n
[license-url]: https://github.com/afeiship/react-ant-i18n/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-i18n
[size-url]: https://github.com/afeiship/react-ant-i18n/blob/master/dist/react-ant-i18n.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-i18n
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-i18n
