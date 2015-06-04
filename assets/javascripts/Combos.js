jQuery2(function() {
	Redcase.Combos.bindEvents();	
});

Redcase.Combos = {};

Redcase.Combos.bindEvents = function() {
	jQuery2('.report_combo').on('change', Redcase.Combos.changed);
	jQuery2('#filter_id_').on('change', Redcase.Combos.refreshFilter);
}

Redcase.Combos.update = function() {
	var
	apiParms = {};	
	jQuery2.extend(apiParms, Redcase.methods.combos.actions.index.getCall(), {
		success : function(data, textStatus, request) {
			jQuery2('#combos_id').html(data);
			Redcase.Combos.bindEvents();
			jQuery2('#versionx').change();
		},
		errorMessage : "An unknown error ocurred"
	});
	Redcase.apiCall(apiParms);	
}

Redcase.Combos.changed = function() {
	var
	apiParms = {};	
	jQuery2.extend(apiParms, Redcase.methods.combos.actions.index.getCall(), {
		params : {
			'environment_id' : jQuery2('#environment').val(),
			'suite_id': jQuery2('#suite').val(),
			'version_id': jQuery2('#versionx').val(),
			'button': true
		},		
		success : function(data, textStatus, request) {
			jQuery2('#download_button_id').html(data);
		},
		errorMessage : "An unknown error ocurred"
	});
	Redcase.apiCall(apiParms);
	
	Redcase.Graph.update();
	
	apiParms = {};	
	jQuery2.extend(apiParms, Redcase.methods.executionSuite.actions.index.getCall(), {
		params : {
			'environment_id' : jQuery2('#environment').val(),
			'suite_id': jQuery2('#suite').val(),
			'version_id': jQuery2('#versionx').val(),
			'get_results': true
		},		
		success : function(data, textStatus, request) {
			jQuery2('#report_results_table_id').html(data);
		},
		errorMessage : "Couldn't load results"
	});
	Redcase.apiCall(apiParms);	
} 

Redcase.Combos.refreshFilter = function() {
	var 
		el,
		filtered,
		i,
		els,
		k;
	el = document.getElementById('filter_id_');
	filtered = el.options[el.selectedIndex].text;
	for (i = 0; i < Redcase.result_names.length; i++) {
		els = document.getElementsByName(Redcase.result_names[i]);
		for (k = 0; k < els.length; k++) {
			els[k].style.display = (
				(filtered == 'All results')
				|| (Redcase.result_names[i] == filtered)
				|| (filtered == 'Not passed' && Redcase.result_names[i] !== 'Passed')
			)
				? 'table-row'
				: 'none';
		}
	}
} 