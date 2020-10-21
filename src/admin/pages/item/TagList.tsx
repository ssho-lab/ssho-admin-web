import React, {useState} from 'react';
import {Select, Button} from 'antd';
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
}


  
const TagList = ({tagListPerItem, allTagList}: TagListProps) => {
  const realTagList = tagListPerItem && Array.from(new Set<string>(tagListPerItem.map(el => el.realTagList).flat().map(tag=>tag.name)));

  const options= allTagList.map(el => {
    return (
      <OptGroup label={el.expTag.name}>
        {el.realTagList.map(realTag => <Option value={realTag.name}>{realTag.name}</Option>)}
      </OptGroup>
    )
  })

  const [buttonClickable, setButtonClickable] = useState<boolean>(false);

  const handleSelectChange = (selected: string[]) => {
    if(JSON.stringify(selected.sort()) === JSON.stringify(realTagList.sort())){
      setButtonClickable(false);
      return;
    }
    setButtonClickable(true);
  }

  return (
    <div style={{display: 'flex'}}>
      <Select mode="multiple" defaultValue={realTagList} style={{width: '80%'}}  placeholder="태그 리스트" optionLabelProp="label" onChange={handleSelectChange}>{options}</Select>
      <Button type="primary" style={{width: '20%'}} disabled={!buttonClickable}>태그 수정</Button>
    </div>
  );
}

export default TagList;