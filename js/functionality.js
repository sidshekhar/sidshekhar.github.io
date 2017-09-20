$(document).ready(function (){


    $("#intro").appendTo("body").modal("show");
	//Topics
    $('#city').click(function (){
    	var tab = $(this);
    	$('.topic').removeClass('active');
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	tab.addClass('active');
    	hide_all_entities();
    	hide_all_components();
        hide_all_schema_snippets();
        $("#entitycontainer").delay(250).animate({ opacity: 1 }, 300);
        $("#cityEntities").show();
    });
    $('#humanbody').click(function (){
    	var tab = $(this);
    	$('.topic').removeClass('active');
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	tab.addClass('active');
    	hide_all_entities();
    	hide_all_components();
        hide_all_schema_snippets();
        $("#entitycontainer").delay(250).animate({ opacity: 1 }, 300);
        $("#humanbodyEntities").show();
    });
    $('#financialmarket').click(function (){
    	var tab = $(this);
    	$('.topic').removeClass('active');
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	tab.addClass('active');
    	hide_all_entities();
    	hide_all_components();
        hide_all_schema_snippets();
        $("#entitycontainer").delay(250).animate({ opacity: 1 }, 300);
        $("#financialmarketEntities").show();
    });
    $('#solarsystem').click(function (){
    	var tab = $(this);
    	$('.topic').removeClass('active');
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	tab.addClass('active');
    	hide_all_entities();
    	hide_all_components();
        hide_all_schema_snippets();
        $("#entitycontainer").delay(250).animate({ opacity: 1 }, 300);
        $("#solarsystemEntities").show();
    }); 




    //Entities
    $('#humanmale').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);   	   	
    	$('#humanmaleComponents').show();
    });
    $('#humanfemale').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);    	
    	$('#humanfemaleComponents').show();
    }); 
    $('#building').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#buildingComponents').show();

    }); 
    $('#trafficlight').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#trafficlightComponents').show();
    });


     $('#opticnerve').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#opticnerveComponents').show();
    });
    $('#medulaoblongata').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#medulaoblongataComponents').show();
    }); 
    $('#thalamus').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#thalamusComponents').show();
    }); 
    $('#pinealgland').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#pinealglandComponents').show();
    });



     $('#stock').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#stockComponents').show();
    });
    $('#commodity').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#commodityComponents').show();
    }); 
    $('#company').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#companyComponents').show();
    }); 
    $('#trader').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#traderComponents').show();
    });



     $('#asteroid').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#asteroidComponents').show();
    });
    $('#planet').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#planetComponents').show();
    }); 
    $('#sun').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#sunComponents').show();
    }); 
    $('#satellite').click(function (){
    	var active_entity = $(this);
    	$('.entity').removeClass('active');
    	$('.component').removeClass('active');
    	active_entity.addClass('active');
    	hide_all_components();
        hide_all_schema_snippets();
        $("#componentcontainer").delay(250).animate({ opacity: 1 }, 300);
    	$('#satelliteComponents').show();
    });




    //Components
    $('#position_male').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#age_male').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#age_schema').show();

    });
    $('#active').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#active_schema').show();
    });
    $('#wealth_male').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#wealth_schema').show();
    });


     $('#position_female').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
        
    });
    $('#wealth_female').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#wealth_schema').show();
    });
    $('#age_female').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#age_schema').show();
    });
    $('#parent').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#parent_schema').show();
    });



    $('#position_building').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#flammable_building').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#flammable_schema').show();
    });
    $('#height_building').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#height_schema').show();
    });
    $('#occupancy_building').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#occupancy_schema').show();
    });



    $('#position_trafficlight').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#lights').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#lights_schema').show();
    });
    $('#depreciable').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#depreciable_schema').show();
    });




    $('#position_opticnerve').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#neurons').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#neurons_schema').show();
    });
    $('#firing').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#firing_schema').show();
    });
    $('#damaged_opticnerve').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#damaged_schema').show();
    });



    $('#position_medulaoblongata').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#ventilated').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#ventilated_schema').show();
    });
    $('#reflex').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#reflex_schema').show();
    });



    $('#position_thalamus').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#relay').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#relay_schema').show();
    });
    $('#neuronalprocessing').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#neuronalprocessing_schema').show();
    });



    $('#position_pinealgland').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#sleepmodulation').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#sleepmodulation_schema').show();
    });
    $('#melatoninproduction').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#melatoninproduction_schema').show();
    });



    $('#position_stock').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#listedcountry').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#listedcountry_schema').show();
    });
    $('#marketcapitalization').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#marketcapitalization_schema').show();
    });
    $('#tickersymbol').click(function (){
        var active_component = $(this);
        $('.component').removeClass('active');
        active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#tickersymbol_schema').show();
    });


    $('#positon_commodity').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#value_commodity').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#value_schema').show();
    });
    $('#name_commodity').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#name_schema').show();
    });


    $('#positon_company').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#sector').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#sector_schema').show();
    });
    $('#grossrevenue').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#grossrevenue_schema').show();
    });
    $('#netprofit').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#netprofit_schema').show();
    });


    $('#positon_trader').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#employer').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#employer_schema').show();
    });


    $('#positon_asteroid').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#asteroid_weight').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#weight_schema').show();
    });
    $('#speed').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#velocity_schema').show();
    });
    $('#cluster').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#cluster_schema').show();
    });


     $('#positon_planet').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#mass').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#mass_schema').show();
    });



    $('#positon_sun').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#temperature_sun').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#temperature_schema').show();
    });


    $('#positon_satellite').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#position_schema').show();
    });
    $('#countryaffiliation').click(function (){
    	var active_component = $(this);
    	$('.component').removeClass('active');
    	active_component.addClass('active');
        hide_all_schema_snippets();
        document.querySelector('.finalcontainer').scrollIntoView({ behavior: 'smooth' });
        $(".finalcontainer").delay(250).animate({ opacity: 1 }, 300);
        $('#countryaffiliation_schema').show();
    });


 });




function hide_all_entities(){
	$('#cityEntities').hide();
	$('#humanbodyEntities').hide();
    $('#financialmarketEntities').hide();
    $('#solarsystemEntities').hide();
}



function hide_all_components(){
	$('#humanmaleComponents').hide();
	$('#humanfemaleComponents').hide();
	$('#buildingComponents').hide();
	$('#trafficlightComponents').hide();
	$('#opticnerveComponents').hide();
	$('#medulaoblongataComponents').hide();
	$('#thalamusComponents').hide();
	$('#pinealglandComponents').hide();
	$('#stockComponents').hide();
	$('#commodityComponents').hide();
	$('#companyComponents').hide();
	$('#traderComponents').hide();
	$('#asteroidComponents').hide();
	$('#planetComponents').hide();
	$('#sunComponents').hide();
	$('#satelliteComponents').hide();
}


function hide_all_schema_snippets(){
    $('#position_schema').hide();
    $('#age_schema').hide();
    $('#active_schema').hide();
    $('#wealth_schema').hide();
    $('#parent_schema').hide();
    $('#flammable_schema').hide();
    $('#occupancy_schema').hide();
    $('#lights_schema').hide();
    $('#depreciable_schema').hide();
    $('#neurons_schema').hide();
    $('#firing_schema').hide();
    $('#damaged_schema').hide();
    $('#ventilated_schema').hide();
    $('#reflex_schema').hide();
    $('#relay_schema').hide();
    $('#neuronalprocessing_schema').hide();
    $('#melatoninproduction_schema').hide();
    $('#listedcountry_schema').hide();
    $('#marketcapitalization_schema').hide();
    $('#sleepmodulation_schema').hide();
    $('#tickersymbol_schema').hide();
    $('#height_schema').hide();
    $('#name_schema').hide();
    $('#value_schema').hide();
    $('#sector_schema').hide();
    $('#grossrevenue_schema').hide();
    $('#netprofit_schema').hide();
    $('#employer_schema').hide();
    $('#weight_schema').hide();
    $('#velocity_schema').hide();
    $('#cluster_schema').hide();
    $('#mass_schema').hide();
    $('#temperature_schema').hide();
    $('#countryaffiliation_schema').hide();
}

    
