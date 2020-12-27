import React, { useState } from 'react';
import { Select, Button, message } from 'antd';
import axios from 'axios';
import API_ENDPOINTS from "../../../endpoints";

const { Option } = Select;

interface Tag {
  id: string;
  name: string;
}


interface TagListProps {
  tagListPerItem: Tag[] | null;
  allTagList: Tag[];
  itemId: string;
}

const updateTag = (itemId: string, data: any) => {
  return axios.post(API_ENDPOINTS.ITEM_API + '/item/update/tag', data, {
    params: {
      itemId
    }
  })
}

const TagList = ({ itemId, tagListPerItem, allTagList }: TagListProps) => {
  let defaultTagList: any[] | undefined = tagListPerItem === null ? undefined : tagListPerItem.map(el => el.name)

  const options = allTagList.map(tag => {
    return (
      <Option style={{ fontSize: '10px' }} label={tag.id} value={tag.name}>{tag.name}</Option>
    )
  })

  const [buttonClickable, setButtonClickable] = useState<boolean>(false);
  const [newTagList, setNewTagList] = useState<string[]>([]);

  const handleSelectChange = (selected: string[], options: any) => {

    setNewTagList(options.map((option: any) => option.value));

    if (JSON.stringify(selected.sort()) === JSON.stringify(defaultTagList && defaultTagList.sort())) {
      setButtonClickable(false);
      return;
    }

    setButtonClickable(true);
  }

  const handleClick = () => {

    const data = allTagList.filter(tag => newTagList.includes(tag.name));

    updateTag(itemId, data)
      .then(function (response: any) {
        message.success('태그 수정 완료');
        setButtonClickable(false);
        defaultTagList = newTagList;
      })
      .catch(function (err: any) {
        message.error('태그 수정 실패');
      })
  }

  return (
    <div>
      <Select mode="multiple" allowClear defaultValue={defaultTagList} style={{ width: '100%', fontSize: '10px' }} placeholder="태그 리스트" onChange={handleSelectChange}>{options}</Select>
      <Button style={{ width: '100%', fontSize: '10px' }} type="primary" disabled={!buttonClickable} onClick={handleClick}>태그 수정</Button>
    </div>
  );
}

export default TagList;
