# Specifying a different backend for matplotlib so that it can run outside the main thread
import matplotlib
matplotlib.use('Agg')

import base64
import io
import matplotlib.pyplot as plt
import numpy as np

def generate_heatmap_image(values_list, 
                           dimensions_list,
                           first_parameter_index,
                           second_parameter_index,
                           x_parameter_name = "", 
                           y_parameter_name = ""):
    
    # Compute dimensions
    reshaped_values_list = np.reshape(values_list, dimensions_list)

    number_dimensions = len(dimensions_list)
    mean_axis_parameters_index_list = list(range(number_dimensions))
    mean_axis_parameters_index_list.remove(first_parameter_index)
    mean_axis_parameters_index_list.remove(second_parameter_index)

    heatmap_points = reshaped_values_list
    if len(mean_axis_parameters_index_list) > 0:
        heatmap_points = np.mean(reshaped_values_list, 
                                 axis=mean_axis_parameters_index_list)

    # Main heatmap
    plt.clf()
    plt.imshow(heatmap_points)
    plt.xlabel(x_parameter_name, fontsize='x-large')
    plt.ylabel(y_parameter_name, fontsize='x-large')

    # Legend
    cbar = plt.colorbar()
    cbar.set_label('Average Tremor', fontsize='large')

    # Generate image
    pic_iobytes = io.BytesIO()
    plt.savefig(pic_iobytes, format='jpeg')
    pic_iobytes.seek(0)
    pic_hash = base64.b64encode(pic_iobytes.read())
    
    # Return image
    return pic_hash.decode("utf-8")

def compute_mean_along_dimension(values_list, parameter):
    return np.mean(values_list, axis=parameter)

def generate_2d_graph_image(values_list, 
                            dimensions_list, 
                            first_parameter_index,
                            second_parameter_index,
                            x_parameter_name = "", 
                            y_parameter_name = ""):
    
    # # Main heatmap
    # plt.clf()
    # plt.imshow(np.reshape(values_list, dimensions_list))
    # plt.xlabel(x_parameter_name, fontsize='x-large')
    # plt.ylabel('Tremor Intensity', fontsize='x-large')

    # # Generate image
    # pic_iobytes = io.BytesIO()
    # pic_iobytes.seek(0)
    # pic_hash = base64.b64encode(pic_iobytes.read())
    
    # # Return image
    # return pic_hash.decode("utf-8")
    pass
