import { GlobalRegistry } from "@designable/core";
import { TextWidget, useDesigner } from "@designable/react";
import { observer } from "@formily/react";
import { Button, Radio, Space } from "antd";
import { useEffect } from "react";
import { loadInitialSchema, saveSchema } from "../service";

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  useEffect(() => {
    loadInitialSchema(designer);
  }, []);
  const supportLocales = ["zh-cn", "en-us"];
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage("zh-cn");
    }
  }, []);
  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: "English", value: "en-us" },
          { label: "简体中文", value: "zh-cn" },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  );
});
