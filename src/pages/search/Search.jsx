import React, { useState } from 'react';
import Navbar from '../../components/nav/Navbar';
import SearchForm from '../../components/search/SearchForm';
import ResultList from '../../components/search/ResultList';

const Search = () => {
	const [dataForm, setDataForm] = useState("")
	const getDataForm = (data) => {
		setDataForm(data)
	}
	return (
		<div className='app bg-dark'>
			<Navbar />
			<SearchForm onSaveData= {getDataForm}/>
			<ResultList keyword={dataForm}/>
		</div>
	);
};

export default Search;
