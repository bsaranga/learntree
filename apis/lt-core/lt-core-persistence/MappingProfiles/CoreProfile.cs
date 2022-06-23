using AutoMapper;
using lt_core_application.DTOs;
using lt_core_persistence.Models;

namespace lt_core_persistence.MappingProfiles
{
    public class CoreProfile : Profile
    {
        public CoreProfile()
        {
            CreateMap<UserTopic, TopicDTO>()
                .ForMember(dest => dest.TopicId, opt => opt.MapFrom(src => src.TopicId))
                .ForMember(dest => dest.TopicName, opt => opt.MapFrom(src => src.Topic!.TopicName));
            
            CreateMap<Topic, TopicDTO>()
                .ForMember(dest => dest.TopicId, opt => opt.MapFrom(src => src.TopicId))
                .ForMember(dest => dest.TopicName, opt => opt.MapFrom(src => src.TopicName));
        }
    }
}