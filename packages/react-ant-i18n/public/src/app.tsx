import React, { useState } from 'react';
import { useIntl } from '../../src/main';
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
  { value: 'zh-CN', label: '中文' },
  { value: 'ru-RU', label: 'Русский' },
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
