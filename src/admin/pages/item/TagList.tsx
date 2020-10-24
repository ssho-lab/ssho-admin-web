import React, {useState} from 'react';
import {Select, Button, message} from 'antd';
import axios from 'axios';
import API_ENDPOINTS from '../../../endpoints';

const {Option, OptGroup} = Select;

interface Tag{
  id: string;
  name: string;
  embedding?: null;
}

interface TagProps{
  expTag: Tag;
  realTagList: Tag[];
}

interface TagListProps{
  tagListPerItem: TagProps[];
  allTagList: TagProps[];
  itemId: string;
}

const updateTag = (itemId: string, data: any) => {
  return axios.post(API_ENDPOINTS.ITEM_API+'/item/update/tag',data, {
    params:{
      itemId
    }
  })
}

const TagList = ({itemId, tagListPerItem, allTagList}: TagListProps) => {
  let defaultTagList = tagListPerItem && Array.from(new Set<string>(tagListPerItem.map(el => el.realTagList).flat().map(tag=> tag.name)))
  const options= allTagList.map(el => {
    return (
      <OptGroup label={el.expTag.name}>
        {el.realTagList.map(realTag => <Option label={el.expTag.name} value={realTag.name}>{realTag.name}</Option>)}
      </OptGroup>
    )
  })

  const [buttonClickable, setButtonClickable] = useState<boolean>(false);
  const [expTagList, setExpTagList] = useState<string[]>([]);
  const [realTagList, setRealTagList] = useState<string[]>([]);

  const handleSelectChange = (selected: string[], options: any) => {
    setExpTagList(Array.from(new Set<string>(options.map((option: any) => option.label))));
    setRealTagList(options.map((option: any) => option.value));

    if(JSON.stringify(selected.sort()) === JSON.stringify(defaultTagList.sort())){
      setButtonClickable(false);
      return;
    }
    setButtonClickable(true);
  }

  const handleClick = () => {
    let newTagList = allTagList.filter(el => expTagList.includes(el.expTag.name));
    newTagList.forEach(el => el.realTagList = el.realTagList.filter(realTag => realTagList.includes(realTag.name)));


    updateTag(itemId, newTagList)
      .then(function (response: any) {
        message.success('태그 수정 완료');
        setButtonClickable(false);
        defaultTagList = [...realTagList];
      })
      .catch(function (err){
        message.error('태그 수정 실패');
      })
  }

  return (
    <div>
      <Select mode="multiple" allowClear defaultValue={defaultTagList} style={{width: '100%', fontSize: '10px'}}  placeholder="태그 리스트" onChange={handleSelectChange}>{options}</Select>
      <Button style={{width: '100%', fontSize: '10px'}}  type="primary" disabled={!buttonClickable} onClick={handleClick}>태그 수정</Button>
    </div>
  );
}

export default TagList;
