import React, {useState} from 'react';
import {Select, Button, message} from 'antd';
import axios from 'axios';
import API_ENDPOINTS from '../../../endpoints';

const {Option, OptGroup} = Select;

interface Tag{
  id: string;
  name: string;
  level: number;
  parentTagId: string;
}

interface TagGroup{
  lvl1Tag: Tag;
  lvl2Tag: Tag[];
}

interface TagListProps{
  tagListPerItem: TagGroup[] | null;
  allTagList: TagGroup[];
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
  let defaultTagList: any[] | undefined = tagListPerItem===null ? undefined : tagListPerItem.map(el => Object.values(el).flat().map(tag => tag.name))

  const options= allTagList.map(el => {
    return (
      <OptGroup label={el.lvl1Tag.name}>
        <Option style={{fontSize: '10px'}} label={el.lvl1Tag.id} value={el.lvl1Tag.name} isParent={true}>{el.lvl1Tag.name}</Option>
        {el.lvl2Tag.length=== 0 ? null : el.lvl2Tag.map(tag => <Option style={{fontSize: '10px'}} label={tag.id} value={tag.name} isParent={false}>{tag.name}</Option>)}
      </OptGroup>
    )
  })

  const [buttonClickable, setButtonClickable] = useState<boolean>(false);
  const [level1TagList, setLevel1TagList] = useState<string[]>([]);
  const [level2TagList, setLevel2TagList] = useState<string[]>([]);

  const handleSelectChange = (selected: string[], options: any) => {

    options.forEach((option: any) => {
      if(option.isParent) setLevel1TagList([...level1TagList,option.value]);
      else setLevel2TagList([...level2TagList, option.value]);
    })


    if(JSON.stringify(selected.sort()) === JSON.stringify(defaultTagList && defaultTagList.sort())){
      setButtonClickable(false);
      return;
    }
    setButtonClickable(true);
  }

  const handleClick = () => {
    let newTagList = allTagList.filter(el => level1TagList.includes(el.lvl1Tag.name));
    newTagList.forEach(el => el.lvl2Tag = el.lvl2Tag.filter(tag => level2TagList.includes(tag.name)));

    updateTag(itemId, newTagList)
      .then(function (response: any) {
        message.success('태그 수정 완료');
        setButtonClickable(false);
        defaultTagList = [...level1TagList, ...level2TagList];
      })
      .catch(function (err: any){
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
