from .site_config import site_config


def hostname(request):
    hostname = request.META['HTTP_HOST']
    config = site_config['default']
    if 'jsnetwork' in hostname:
        config = site_config['jsnetwork']
    return {
        'config': config
    }
