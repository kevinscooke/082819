import React from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	MultiList,
	SelectedFilters,
	ReactiveList
} from '@appbaseio/reactivesearch';
import {
	Row,
	Button,
	Col,
	Card,
	Switch,
	Tree,
	Popover,
	Affix
} from 'antd';
import 'antd/dist/antd.css';


import ExpandCollapse from 'react-expand-collapse';

import './style.css';

const { TreeNode } = Tree;

const renderAsTree = (res, key = '0') => {
	if (!res) return null;
	const iterable = Array.isArray(res) ? res : Object.keys(res);
	return iterable.map((item, index) => {
		const type = typeof res[item];
		if (type === 'string' || type === 'number') {
			return (
				<TreeNode
					title={
						<div>
							<span>{item}:</span>&nbsp;
							<span dangerouslySetInnerHTML={{ __html: res[item] }} />
						</div>
					}
					key={key + "-" + (index + 1)}
				/>
			);
		}
		const hasObject = (res[item] === undefined && typeof item !== 'string');
		const node = hasObject ? item : res[item];
		return (
			<TreeNode
				title={typeof item !== 'string' ? 'Object' : '' + (node || Array.isArray(res) ? item : item + ': null')}
				key={key + "-" + (index + 1)}
			>
				{renderAsTree(node, key + "-" + (index + 1))}
			</TreeNode>
		);
	});
};

function renderItem(res, triggerClickAnalytics) {
	return (
		<div onClick={triggerClickAnalytics} className="list-item" key={res._id}>
			<ExpandCollapse
				previewHeight="390px"
				expandText="Show more"
			>
				{
					<Tree showLine>
						{renderAsTree(res)}
					</Tree>
				}
			</ExpandCollapse>
		</div>
	);
};

const App = () => (
	<ReactiveBase
		app="rhi2"
		credentials="doMFe2npN:d4536105-f17a-4125-af26-647805c7e782"
		url="https://scalr.api.appbase.io"
		analytics
		searchStateHeader
	>
		<Row gutter={16} style={{ padding: 20 }}>
			<Col span={12}>
				<Card>
				<MultiList
				  componentId="list-1"
				  dataField="category.keyword"
				  showSearch={false}
				  size={7}
				  style={{
				    marginBottom: 20
				  }}
				  title="Category"
				/>
				<MultiList
				  componentId="list-2"
				  dataField="awg.keyword"
				  showSearch={false}
				  size={100}
				  sortBy="desc"
				  style={{
				    marginBottom: 20
				  }}
				  title="AWG"
				/>
				<MultiList
				  componentId="list-3"
				  dataField="flex_type.keyword"
				  showSearch={false}
				  size={100}
				  sortBy="desc"
				  style={{
				    marginBottom: 20
				  }}
				/>
				</Card>
			</Col>
			<Col span={12}>
				<DataSearch
				  componentId="search"
				  dataField={[
				    '﻿part_number'
				  ]}
				  fieldWeights={[
				    1
				  ]}
				  fuzziness={1}
				  highlightField={[
				    '﻿part_number'
				  ]}
				  placeholder="Search for your product here"
				  style={{
				    marginBottom: 20
				  }}
				/>

				<SelectedFilters />

				<ReactiveList
				  componentId="result"
				  dataField="_score"
				  pagination={true}
				  react={{
				    and: [
				      'list-1',
				      'list-2',
				      'list-3',
				      'search'
				    ]
				  }}
				  renderItem={renderItem}
				  size={5}
				  style={{
				    marginTop: 20
				  }}
				/>
			</Col>

		</Row>
	</ReactiveBase>
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

export default App;
