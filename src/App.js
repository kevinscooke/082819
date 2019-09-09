import React from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	MultiList,
	ResultCard,
	SelectedFilters,
	ReactiveList,
	ResultList
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

import './App.css';

const { TreeNode } = Tree;
const { ResultListWrapper } = ReactiveList;

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
	const iterable = Array.isArray(res) ? res : Object.keys(res);

	return iterable.map((item, index) => {

		// <div onClick={triggerClickAnalytics} className="result-card" key={res._id}>
		//

		return (
			// <TreeNode
			// 	title={
			// 		<div>
			// 			<span>{item}:</span>&nbsp;
			// 			<span dangerouslySetInnerHTML={{ __html: res[item] }} />
			// 		</div>
			// 	}
			// 	key={key + "-" + (index + 1)}
			// />
			<ResultCard
	          componentId="results"
	          dataField="part_number"
	          react={{
	            "and": [
					      'list-1',
					      'list-2',
					      'list-3',
					      'search'
					    ]
	          }}
	          onData={(res)=>({
	            "image": "",
	            "title": "asas",
	            "description":  "asas"
	          })}
	        />
		);



		// </div>

	});


};

const App = () => (
	<ReactiveBase
		app="rhi2"
		credentials="doMFe2npN:d4536105-f17a-4125-af26-647805c7e782"
		url="https://scalr.api.appbase.io"
		analytics
		searchStateHeader
	>
	<Row>
	<Col span={24}>
	<div className="navbar">
			<div className="logo">
				Product Search
			</div>
			<DataSearch
				componentId="search"
				dataField={[
					'﻿part_number'
				]}
				fieldWeights={[
					1
				]}
				className="datasearch"
				fuzziness={1}
				highlightField={[
					'﻿part_number'
				]}
				innerClass={{
					"input": "searchbox",
					"list": "suggestionlist"
				}}
				placeholder="Search for your product here"

			/>

			<SelectedFilters />


	</div>
	</Col>
	</Row>
	<br />
	<br />
		<Row gutter={16} style={{ padding: 20 }}>
			<Col span={6}>
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
			<Col span={18}>


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
					render={({ data }) => (

						<ReactiveList.ResultListWrapper className ="resultListItem">
            {
                data.map(item => (
									<a href={item.link.split("[")[1].split("]")[0]} target="_blank">
                    <ResultCard key={item._id}>
                        <ResultCard.Image src={item.image.split("[")[1].split("]")[0]}/>
                        <ResultCard.Title
                            dangerouslySetInnerHTML={{
                                __html: item.part_number
                            }}
                        />
                        <ResultCard.Description>
                            <div>

                                <div>Category: {item.category}</div>
                                <div>
                                  Flex Type : {item.flex_type}
                                </div>
                            </div>
                            <span>
                                AWG {item.awg}
                            </span>
                        </ResultCard.Description>
                    </ResultCard>
										</a>
                ))
            }
        </ReactiveList.ResultListWrapper>
						// <ReactiveList.ResultListWrapper>
						// 	{data.map(item => (
						//
						//
						// 		<ResultList key={item._id} className="resultListItem">
						//
						// 			<ResultList.Image src={item.image.split("[")[1].split("]")[0]} />
						// 			<ResultList.Content>
						// 				<ResultList.Title>
						// 					<div
						// 						className="title"
						// 						dangerouslySetInnerHTML={{
						// 							__html: item.part_number,
						// 						}}
						// 					/>
						// 				</ResultList.Title>
						// 				<ResultList.Description>
						// 				<a href={item.link.split("[")[1].split("]")[0]} target="_blank">
						//
						// 					<div className="flex column justify-space-between">
						//
						// 					<br />
						// 						<div>
						// 							<div>
						// 								Category:{' '}
						// 								<span className="cable_prop">
						// 									{
						// 										item.category
						//
						//
						// 									}
						// 								</span>
						// 							</div>
						//
						// 						</div>
						//
						// 						<span className="cable_prop">
						// 							Flex Type: {item.flex_type}
						// 						</span>
						// 						<br />
						// 						<span className="cable_prop">
						// 							AWG: {item.awg}
						// 						</span>
						// 						<br />
						// 						<span className="cable_prop">
						// 							Conductors: {item.conductors}
						// 						</span>
						// 						<br />
						// 						<span className="cable_prop">
						// 							Shielding: {item.shielding}
						// 						</span>
						// 						<br />
						// 						<span className="cable_prop">
						// 							Braid: {item.braid}
						// 						</span>
						// 						<br />
						// 						<span className="cable_prop">
						// 							Jacket: {item.jacket}
						// 						</span>
						// 					</div>
						// 					</a>
						// 				</ResultList.Description>
						// 			</ResultList.Content>
						// 		</ResultList>
						//
						// 	))}
						// </ReactiveList.ResultListWrapper>
					)}
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



//
// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import {
// 	ReactiveBase,
// 	SingleDropdownRange,
// 	ResultList,
// 	ReactiveList,
// } from '@appbaseio/reactivesearch';
//
// import './index.css';
//
// const Main = () => (
// 	<ReactiveBase app="good-books-ds" credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d">
// 		<div className="row reverse-labels">
// 			<div className="col">
// 				<SingleDropdownRange
// 					componentId="BookSensor"
// 					dataField="average_rating"
// 					title="SingleDropdownRange"
// 					data={[
// 						{ start: 0, end: 3, label: 'Rating < 3' },
// 						{ start: 3, end: 4, label: 'Rating 3 to 4' },
// 						{ start: 4, end: 5, label: 'Rating > 4' },
// 					]}
// 				/>
// 			</div>
// 			<div className="col" style={{ backgroundColor: '#fafafa' }}>
// 				<ReactiveList
// 					componentId="SearchResult"
// 					dataField="original_title"
// 					size={3}
// 					className="result-list-container"
// 					pagination
// 					URLParams
// 					react={{
// 						and: 'BookSensor',
// 					}}
// 					render={({ data }) => (
// 						<ReactiveList.ResultListWrapper>
// 							{data.map(item => (
// 								<ResultList key={item._id}>
// 									<ResultList.Image src={item.image} />
// 									<ResultList.Content>
// 										<ResultList.Title>
// 											<div
// 												className="book-title"
// 												dangerouslySetInnerHTML={{
// 													__html: item.original_title,
// 												}}
// 											/>
// 										</ResultList.Title>
// 										<ResultList.Description>
// 											<div className="flex column justify-space-between">
// 												<div>
// 													<div>
// 														by{' '}
// 														<span className="authors-list">
// 															{item.authors}
// 														</span>
// 													</div>
// 													<div className="ratings-list flex align-center">
// 														<span className="stars">
// 															{Array(item.average_rating_rounded)
// 																.fill('x')
// 																.map((
// 																	item, // eslint-disable-line
// 																	index,
// 																) => (
// 																	<i
// 																		className="fas fa-star"
// 																		key={index} // eslint-disable-line
// 																	/>
// 																))}
// 														</span>
// 														<span className="avg-rating">
// 															({item.average_rating} avg)
// 														</span>
// 													</div>
// 												</div>
// 												<span className="pub-year">
// 													Pub {item.original_publication_year}
// 												</span>
// 											</div>
// 										</ResultList.Description>
// 									</ResultList.Content>
// 								</ResultList>
// 							))}
// 						</ReactiveList.ResultListWrapper>
// 					)}
// 				/>
// 			</div>
// 		</div>
// 	</ReactiveBase>
// );
//
// ReactDOM.render(<Main />, document.getElementById('root'));
