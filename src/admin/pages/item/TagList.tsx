import React from 'react';
import {Select} from 'antd';

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

  return (
    <Select mode="multiple" defaultValue={realTagList} style={{width: '100%'}}  placeholder="태그 리스트" optionLabelProp="label">{options}</Select>
  );
}

export default TagList;